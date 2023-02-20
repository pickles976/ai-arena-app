<script>
  import { gameData } from "../stores";
  $: team0 = $gameData.score["team 0"]
  $: team1 = $gameData.score["team 1"]
</script>
  
<div class="hor-panel">
    {#if team0}
      Team 0 <br>
      kills: {team0.kills} <br>
      deaths: {team0.deaths} <br>
      metal: {team0.metal} <br>
      energy: {team0.energy} <br>
    {/if}
    {#if team1}
      Team 1 <br>
      kills: {team1.kills} <br>
      deaths: {team1.deaths} <br>
      metal: {team1.metal} <br>
      energy: {team1.energy} <br>
    {/if}
</div>