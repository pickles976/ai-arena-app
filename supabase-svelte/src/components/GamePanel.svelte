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
    import { resizeEditor } from "../editor";
  import GameControls from "./GameControls.svelte";
  
    // callback that runs on each frame
    function callback () {
  
      // Sort this shit
      $gameData.gameObjects = getGameState()
      $gameData.score = getScore()
      $gameData.ships = getShipsInfo()
    }
  
    onMount(() => {
      initGame(callback)
    })
  
  </script>

<div style="position: absolute;">
<div class="hor-panel" style="align-items: stretch;">
    <!-- GAME PANEL -->
    <div class="vert-panel" style="overflow: auto;">
      <div class="canvasContainer">
        <canvas id="game-canvas" width="640" height="480" class="myCanvas"></canvas>
      </div>
    </div>
    <!-- GAME CONTROL PANEL -->
    <div class="vert-panel">
        <GameControls />
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
        <div class="hor-panel" style="overflow: hidden; max-width: 25%;">
            <div style="overflow-y: scroll;">
              <!-- Game Object List -->
              {#each $gameData.gameObjects as gameObject}
                <GameObjectButton object={gameObject} />
              {/each}
            </div>
        </div>
        <div class="hor-panel">
            <!-- Game Object inspector -->
            {#if $gameData.gameObject}
            <GameObject object={$gameData.gameObject} />
            {/if}
        </div>
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