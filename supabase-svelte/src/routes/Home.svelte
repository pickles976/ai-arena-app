<script>
  import GamePanel from "../components/game/GamePanel.svelte";
  import Resizable from "../components/editor/Resizable.svelte";
</script>

<div class="main-div">
  <GamePanel />
  <Resizable />
</div>

<style>
  .main-div { 
    height: 90vh;
    overflow: hidden;
    display: flex;
  } 
</style>