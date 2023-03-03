<script>
  import { run } from "../../game";
  import { gameData } from "../../stores";
</script>

<div class="hor-panel" style="flex-direction: row; max-height: 5vh; align-items: center; justify-content: center; border: 2%">
    <button class="btn-custom" id="run" on:click={() => {run(); $gameData.time = 0;}}>Run</button>
    <button class="btn-custom" id="pause">Pause</button>
    <button class="btn-custom" id="step">Step</button>
    <button class="btn-custom" id="warp">Warp</button>
</div>