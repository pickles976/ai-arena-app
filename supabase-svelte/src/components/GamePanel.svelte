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

<div style="position: absolute; width: 100%; overflow: hidden;">


        <div style="left: 0px; top: 0px; position: absolute; width: 15vw;">
            <div class="hor-panel" style="overflow: hidden; width: 100%">
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

        <!-- GAME PANEL -->
        <div style="height: 100%; width: 100%; display: flex; justify-content: center; flex-direction: row;">
            <div class="canvas-container">
                <canvas id="game-canvas" width="640" height="480" class="myCanvas"></canvas>
            </div>
        </div>

        <!-- GAME CONTROL PANEL -->
        <div style="right: 0px; top: 0px; position: absolute; width: 15vw;">
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