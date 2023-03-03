<script>
  import { onDestroy, onMount } from "svelte";
  import { initGame, stop } from "../../game";
  import { gameData, code } from "../../stores";
  import { getGameState, getScore, getShipsInfo, stopGame } from "ai-arena";
  import GameObjectButton from "./GameObjectButton.svelte";
  import GameObject from "./GameObject.svelte";
  import Score from "./Score.svelte";
  import Teams from "./Teams.svelte";
  import GameControls from "./GameControls.svelte";

  let ctx;
  let steps = 0;

  // TODO: move this logic into a dedicated Game component

  const drawCircle = function (pos) {
    ctx.fillStyle = "#FFFF00";
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
  };

  function physCallback() {
    $gameData.time = $gameData.time + 1;
  }

  // callback that runs on each frame
  function uiCallback() {
    // Sort this shit
    $gameData.gameObjects = getGameState();

    // Make sure the gameObject is fresh each time
    $gameData.gameObject =
      $gameData.gameObjects.filter(
        (obj) => obj?.uuid === $gameData.selectedUUID
      )[0] ?? {};

    $gameData.score = getScore();
    $gameData.ships = getShipsInfo();

    // draw circle
    if ($gameData.gameObject && $gameData.gameObject.transform) {
      drawCircle($gameData.gameObject.transform.position);
    }
  }

  function errorCallback(e) {
    console.log(e)
    alert(e)
  }

  onMount(() => {
    ctx = document.getElementById("game-canvas").getContext("2d");
    initGame(uiCallback, physCallback, errorCallback, $code);
  });

  onDestroy(() => {
    stop()
  })
</script>

<div class="main-div">
  
  <!-- LEFT PANEL -->
  <div class="gameobject-panel bg-gunmetal">
      <div class="bg-gunmetal"> Game Objects </div>
      <div style="overflow-y: scroll; width: 100%; max-height: 25vh; border-width: 2px; border-style: solid;">
        <!-- Game Object List -->
        {#each $gameData.gameObjects as gameObject}
          <GameObjectButton object={gameObject} />
        {/each}
      </div>
      <div class="bg-gunmetal"> Inspector </div>
    <div class="hor-panel" style="overflow-y: scroll; overflow-x: hidden; max-height: 25vh">
      <!-- Game Object inspector -->
      {#if $gameData.gameObject}
        <GameObject object={$gameData.gameObject} />
      {/if}
    </div>
  </div>

  <!-- GAME PANEL -->
  <div class="full-div">
    <div class="canvas-container">
      <canvas id="game-canvas" width="640" height="480" class="game-canvas" />
    </div>
  </div>

  <!-- RIGHT PANEL -->
  <div class="bg-gunmetal" style="right: 0px; top: 0px; position: absolute; width: 12.5vw; height: 100vh;">
    <div class="vert-panel">
      <GameControls />
      <div class="hor-panel timer bg-gunmetal"> Score </div>
      <Score />
      <!-- TIMER -->
      <div class="hor-panel timer bg-gunmetal">
        <div style="width: 100%">{`Timesteps: ${$gameData.time}`}</div>
      </div>
      <div class="bg-gunmetal"> Team Info </div>
      <div class="hor-panel" style="overflow-y: scroll; overflow-x: hidden; max-height: 30vh">
        {#if $gameData.ships}
          <Teams ships={$gameData.ships} />
        {/if}
      </div>
    </div>
  </div>
</div>

<style>

  .timer {
    font-size: small;
    text-align: center;
    color: #BBB;
  }

  .full-div {
    height: 100%; width: 100%; display: flex; justify-content: center; flex-direction: row;
  }

  .main-div {
    position: absolute; 
    width: 100%; 
    overflow: hidden;
    color: #BBB;
  }

  .gameobject-panel {
    left: 0px; 
    top: 0px; 
    position: absolute; 
    width: 12.5vw;
    height: 100vh;
  }

  /* Game canvas */
  .canvas-container {
    width: 50%;
    border: 0;
    margin: 10;
    display: flex;
  }

  .game-canvas {
    width: 100%;
    /* height: 100%; */
    float: left;
  }
</style>
