<script>
  import { onMount } from "svelte";
  import EditorPanel from "../components/EditorPanel.svelte";
  import { initGame } from "../game";
  import { gameData } from "../stores";
  import { getGameState, getScore, getShipsInfo } from "ai-arena"
  import GameObjectButton from "../components/GameObjectButton.svelte";
  import GameObject from "../components/GameObject.svelte";
  import Score from "../components/login/Score.svelte";
  import Teams from "../components/login/Teams.svelte";

  // callback that runs on each frame
  function callback () {

    // Sort this shit
    $gameData.gameObjects = getGameState()
    $gameData.score = getScore()
    $gameData.ships = getShipsInfo()
  }

  onMount(() => initGame(callback))

</script>

<div class="main-div">
  <EditorPanel />

  <div class="vert-panel" style="align-items: stretch">
    <!-- GAME PANEL -->
    <div class="hor-panel" style="resize: both; overflow: auto;">
      <div class="canvasContainer">
        <canvas id="game-canvas" width="640" height="480" class="myCanvas"></canvas>
      </div>
    </div>
    <!-- GAME CONTROL PANEL -->
    <div class="hor-panel" style="flex-direction: row; max-height: 5vh; align-items: center; justify-content: center;">
      <button id="run" on:click={run}>Run</button>
      <button id="pause">Pause</button>
      <button id="step">Step</button>
      <button id="warp">Warp</button>
    </div>
    <!-- GAME INSPECTOR PANEL -->
    <div class="hor-panel" style="overflow: hidden;">
      <div class="vert-panel" style="overflow: hidden; max-width: 25%;">
        <div style="overflow-y: scroll;">
          <!-- Game Object List -->
          {#each $gameData.gameObjects as gameObject}
            <GameObjectButton object={gameObject} />
          {/each}
        </div>
      </div>
      <div class="vert-panel">
        <!-- Game Object inspector -->
        {#if $gameData.gameObject}
        <GameObject object={$gameData.gameObject} />
        {/if}
      </div>
    </div>
  </div>
  <div class="vert-panel" style="max-width: 12vw;">
    <div class="hor-panel">
      {#if $gameData.score}
        <Score score={$gameData.score}/>
      {/if}
    </div>
    <div class="hor-panel">
      {#if $gameData.ships}
        <Teams ships={$gameData.ships}/>
      {/if}
    </div>
  </div>
</div>

<style>
  .main-div { 
    height: 94.2vh;
    overflow: hidden;
    display: flex;
  } 
</style>