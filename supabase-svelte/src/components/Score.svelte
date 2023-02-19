<script>
    import { run } from "../game";
</script>
  
<div class="hor-panel">
    {#if $gameData.score}
      <Score score={$gameData.score}/>
    {/if}
</div>