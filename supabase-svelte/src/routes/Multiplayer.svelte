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

  let galaxyData;

  // Map of user ID to user db object
  let userDict = {};

  // Map of champion ID to UserData obejct
  let championMap = {};

  let champions = [];
  let usersIds = [];


  // TODO: convert to await
  onMount(() => {

    // Get the current war
    getAllWars()
      .then((data) => (galaxyData = data[0]))
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
                  console.log('Change received!', payload)
                })
                .subscribe()
              })
          });
      });
  });
</script>

<div>
  <canvas id="multiplayer-canvas" data-engine="three.js r146" class="multiplayer-canvas"/>
</div>

<style>
  .multiplayer-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>