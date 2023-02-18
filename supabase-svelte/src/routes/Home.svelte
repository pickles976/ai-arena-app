<script>
  import EditorPanel from "../components/EditorPanel.svelte";

</script>

<div class="main-div">
  <EditorPanel />
  <div class="vert-panel">
    <div class="hor-panel">
      GAME PANEL
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
  <div class="vert-panel">
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