<script>
  import { onMount } from "svelte";
  import EditorPanel from "../components/EditorPanel.svelte";
  import { initGame } from "../game";
  import { gameData } from "../stores";
  import { getGameState, getScore, getShipsInfo } from "ai-arena";
  import GameObjectButton from "../components/GameObjectButton.svelte";
  import GameObject from "../components/GameObject.svelte";
  import Score from "./Score.svelte";
  import Teams from "./Teams.svelte";
  import { resizeEditor } from "../editor";
  import GameControls from "./GameControls.svelte";

  let ctx;

  const drawCircle = function (pos) {
    ctx.fillStyle = "#FFFF00";
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
  };

  // callback that runs on each frame
  function callback() {
    // Sort this shit
    $gameData.gameObjects = getGameState();

    // Make sure the gameObject is fresh each time
    $gameData.gameObject =
      $gameData.gameObjects.filter(
        (obj) => obj?.uuid === $gameData.selectedUUID
      )[0] ?? {};

    $gameData.score = getScore();
    $gameData.ships = getShipsInfo();
    $gameData.time = (
      ((performance.now() - $gameData.startTime) * 60) /
      1000
    ).toFixed(0);

    // draw circle
    if ($gameData.gameObject && $gameData.gameObject.transform) {
      drawCircle($gameData.gameObject.transform.position);
    }
  }

  onMount(() => {
    ctx = document.getElementById("game-canvas").getContext("2d");
    initGame(callback);
  });
</script>

<div class="main-div">
  <!-- LEFT PANEL -->
  <div class="gameobject-panel">
      <div style="overflow-y: scroll; width: 100%; max-height: 25vh; border-width: 2px; border-style: solid;">
        <!-- Game Object List -->
        {#each $gameData.gameObjects as gameObject}
          <GameObjectButton object={gameObject} />
        {/each}
      </div>
    <div class="hor-panel" style="overflow-y: scroll; overflow-x: hidden; max-height: 25vh">
      <!-- Game Object inspector -->
      {#if $gameData.gameObject}
        <GameObject object={$gameData.gameObject} />
      {/if}
    </div>
  </div>

  <!-- GAME PANEL -->
  <div
    style="height: 100%; width: 100%; display: flex; justify-content: center; flex-direction: row;"
  >
    <div class="canvas-container">
      <canvas id="game-canvas" width="640" height="480" class="game-canvas" />
    </div>
  </div>

  <!-- RIGHT PANEL -->
  <div style="right: 0px; top: 0px; position: absolute; width: 15vw;">
    <div class="vert-panel">
      <GameControls />
      <Score />
      <!-- TIMER -->
      <div class="hor-panel">
        <div>{`Timesteps: ${$gameData.time}`}</div>
      </div>
      <div class="hor-panel">
        {#if $gameData.ships}
          <Teams ships={$gameData.ships} />
        {/if}
      </div>
    </div>
  </div>
</div>

<style>

  .main-div {
    position: absolute; 
    width: 100%; 
    overflow: hidden;
    color: #888;
  }

  .gameobject-panel {
    left: 0px; 
    top: 0px; 
    position: absolute; 
    width: 15vw;
  }

  .hor-panel {
    border-width: 2px;
    border-style: solid;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
  }

  /* Code editor and game page panels */
  .vert-panel {
    border-width: 2px;
    border-style: solid;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
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
