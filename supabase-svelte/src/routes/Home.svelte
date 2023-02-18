<script>
  import { onMount } from "svelte";
  import EditorPanel from "../components/EditorPanel.svelte";
  import { initGame } from "../game";
  import { gameData } from "../stores";
  import { getGameState } from "ai-arena"

  // callback that runs on each frame
  function callback () {
    $gameData.gameObjects = getGameState()

    // TODO: do something with this data
    console.log($gameData)
  }

  onMount(() => initGame(callback))

</script>

<div class="main-div">
  <EditorPanel />

  <div class="vert-panel">
    <div class="hor-panel" style="resize: both; overflow: auto">
      <!-- GAME SCREEN -->
      <div class="canvasContainer">
        <canvas id="game-canvas" width="640" height="480" class="myCanvas"></canvas>
      </div>
    </div>
    <div class="hor-panel" style="flex-direction: row; max-height: 5vh; align-items: center; justify-content: center;">
      <button id="run" on:click={run}>Run</button>
      <button id="pause">Pause</button>
      <button id="step">Step</button>
      <button id="warp">Warp</button>
    </div>
    <div class="hor-panel">
      <div class="vert-panel">
        Game Object List
      </div>
      <div class="vert-panel">
        Game Object inspector
      </div>
    </div>
  </div>
  <div class="vert-panel" style="max-width: 12vw;">
    <div class="hor-panel">SCORE PANEL</div>
    <div class="hor-panel">TEAMS PANEL</div>
  </div>
</div>

<style>
  .main-div { 
    height: 94.2vh;
    overflow: hidden;
    display: flex;
  } 
</style>