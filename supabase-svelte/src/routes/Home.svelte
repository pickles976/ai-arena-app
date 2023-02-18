<script>
  import EditorPanel from "../components/EditorPanel.svelte";

</script>

<div class="main-div">
  <EditorPanel />

  <div class="vert-panel">
    <div class="hor-panel">
      GAME PANEL
    </div>
    <div class="hor-panel" style="flex-direction: row; max-height: 5vh; align-items: center; justify-content: center;">
      <button>Run</button>
      <button>Pause</button>
      <button>Step</button>
      <button>Normal</button>
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