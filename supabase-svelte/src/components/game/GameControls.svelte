<script>
  import { run } from "../../game";
</script>

<div class="hor-panel" style="flex-direction: row; max-height: 5vh; align-items: center; justify-content: center;">
    <button id="run" on:click={run}>Run</button>
    <button id="pause">Pause</button>
    <button id="step">Step</button>
    <button id="warp">Warp</button>
</div>