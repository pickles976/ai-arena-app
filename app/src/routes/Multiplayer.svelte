<script>
  import { UserData } from "ai-arena-map-headless";
  import { onMount } from "svelte";
  import {
    getAllStarsForWar,
    getAllUsers,
    getAllWars,
  } from "../features/multiplayer";
  import { getAllChampions } from "../features/champions";
  import { initializeViewer, galaxy3D } from "../galaxy";
  import { supabase } from "../supabaseClient";
  import UserPanel from "../components/multiplayer/UserPanel.svelte";

  let galaxyData;

  // Map of user ID to user db object
  let userDict = {};

  // Map of champion ID to UserData obejct
  let championMap = {};

  let champions = [];
  let usersIds = [];

  let strengthData = {}

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
                  // console.log('Change received!', payload)
                  console.log("change received")
                })
                .subscribe()
              })
          });
      });
  });
</script>

<div>
  <canvas id="multiplayer-canvas" data-engine="three.js r146" class="multiplayer-canvas"/>
  <UserPanel data={strengthData}></UserPanel>
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