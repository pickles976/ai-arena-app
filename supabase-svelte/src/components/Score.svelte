<script>
  import { gameData } from "../stores";
  $: team0 = $gameData.score["team 0"];
  $: team1 = $gameData.score["team 1"];
</script>

<div class="score-panel bg-gunmetal">
  <div class="teams-info" id="teams-info">
    <div class="container row">
      <div class="col-left">
        <div class="cell">Values</div>
        <div class="cell">Kills</div>
        <div class="cell">Deaths</div>
        <div class="cell">Metal</div>
        <div class="cell">Energy</div>
      </div>
      <div class="col-middle">
        {#if team0}
          <div class="cell">Team 0</div>
          <div class="cell">{team0.kills}</div>
          <div class="cell">{team0.deaths}</div>
          <div class="cell">{team0.metal}</div>
          <div class="cell">{team0.energy}</div>
        {/if}
      </div>
      <div class="col-middle">
        {#if team0}
          <div class="cell">Team 1</div>
          <div class="cell">{team1.kills}</div>
          <div class="cell">{team1.deaths}</div>
          <div class="cell">{team1.metal}</div>
          <div class="cell">{team1.energy}</div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .score-panel {
    font-size: small;
    color: #BBB
  }

  .container {
    width: 100%;
    height: 100%;
    border: 0;
    margin: 0;
    display: flex;
  }

  .row {
    flex-direction: row;
  }

  .cell {
    /* border:1px solid white; */
    background-color: var(--primary);
    margin: 5%;
  }

  .col-left {
    width: 33%;
    height: 100%;
    border-collapse: collapse;
    border: 0;
    margin: 0;
    float: left;
    /* padding: 2px; */
    white-space: nowrap;
  }

  .col-middle {
    width: 33%;
    height: 100%;
    border-collapse: collapse;
    border: 0;
    margin: 0;
    float: left;
    /* padding: 2px; */
    white-space: nowrap;
  }
</style>
