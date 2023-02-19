<script>
  import GamePanel from "../components/GamePanel.svelte";
  import Resizable from "../components/Resizable.svelte";
</script>

<div class="main-div">
  <GamePanel />
  <Resizable />
</div>

<style>
  .main-div { 
    height: 94.2vh;
    overflow: hidden;
    display: flex;
  } 
</style>