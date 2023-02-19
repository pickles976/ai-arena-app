    
    <!-- GAME INSPECTOR PANEL -->
    <div class="vert-panel" style="overflow: hidden;">
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