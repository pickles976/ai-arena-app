<script>
  import { UserData } from "ai-arena-map-headless";
  import { onDestroy, onMount } from "svelte";
  import {
    getAllStarsForWar,
    getAllUsers,
    getAllWars,
  } from "../features/multiplayer";
  import { getAllChampions, getChampionsForUser } from "../features/champions";
  import { initializeViewer, galaxy3D, killGalaxy } from "../galaxy";
  import { supabase } from "../supabaseClient";
  import UserPanel from "../components/multiplayer/UserPanel.svelte";
  import Actions from "../components/multiplayer/Actions.svelte";
  import Modal, { getModal } from "../components/Modal.svelte";
  import { auth }  from '../stores';

  let galaxyData;

  // Map of user ID to user db object
  let userDict = {};

  // Map of champion ID to UserData obejct
  let championMap = {};

  let champions = [];
  let usersIds = [];

  // props for child components
  let strengthData = {}
  let updates = []

  function buildInfo(stars){

    let userStrength = {}
    let userMap = {}

    stars.forEach((star) => {
      if (star.owner) {
          if (star.owner.uuid in userStrength) {
              userStrength[star.owner.uuid] = userStrength[star.owner.uuid] + 1
          } else {
              userStrength[star.owner.uuid] = 1
          }
          userMap[star.owner.uuid] = star.owner
      }
    })

    Object.keys(userMap).forEach((id) => {
      userMap[id].strength = userStrength[id]
    })

    return userMap

  }


  // TODO: convert to await
  onMount(() => {

    if ($auth.session){
      getChampionsForUser($auth)
        .then((data) => {
          if (data.length <= 0) {
            getModal('no-champion').open()
          }
        })
    } else {
      getModal('no-champion').open()
    }

    // Get the current war
    getAllWars()
      .then((data) => (galaxyData = data[data.length - 1]))
      .then(() => initializeViewer(galaxyData.seed, galaxyData.num_systems)) // Initalize the galaxy with data
      .then(() => {
        getAllChampions(galaxyData.champions) // get all champions in the given war
          .then((data) => {
            champions = data;
            usersIds = champions.map((champion) => champion.owner);

            getAllUsers(usersIds) // get all users from the champion data
              .then((data) =>
                data.forEach((user) => (userDict[user.id] = user))
              )
              .then(() =>
                champions.forEach((champion) => {
                  let user = userDict[champion.owner];
                  championMap[champion.id] = new UserData(
                    user.id,
                    user.username,
                    champion.color
                  );
                })
              )
              .then(() => {
                getAllStarsForWar(galaxyData.id) // Get all the stars in the war
                  .then((data) => {
                    data.forEach((star) => {
                      galaxy3D.updateStar(
                        star.relative_id,
                        championMap[star.champion]
                      ); // Build UserData objects from champions and users
                    });
                  });
              })
              .then(() => {
                supabase
                .channel('any')
                .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'star_systems' }, payload => {
                  let update = payload.new
                  galaxy3D.updateStar(update.relative_id, championMap[update.champion])
                  strengthData = buildInfo(galaxy3D.stars)
                  updates = updates.concat([{'star': galaxy3D.starDict[update.relative_id], 'user': championMap[update.champion]}])
                  if (updates.length > 10){
                    updates.shift()
                  }
                  // console.log('Change received!', payload)
                  console.log("change received")
                })
                .subscribe()
              })
          });
      });
  });

  onDestroy(()=>{
	  supabase.channel('any').unsubscribe()
    supabase.removeAllChannels()
    killGalaxy()
  })
</script>

<div>
  <canvas id="multiplayer-canvas" data-engine="three.js r146" class="multiplayer-canvas"/>
  <UserPanel data={strengthData}></UserPanel>
  <Actions actions={updates}></Actions>

  <Modal id='no-champion'>
    <h2>You don't have any champions!</h2>
    <p>To play in the galactic battle royale, you'll need to create a Champion with some code and set it active!</p>
    <p>Visit the <b>homepage</b> to write some code. When you're done, create a Champion in the  <b>browser</b> and set it active.</p>
    <p>Active champions will automatically participate in each new battle royale.</p>
  </Modal>
</div>

<style>
  .multiplayer-canvas {
    z-index: -1;
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    display: block;
  }
</style>