<script>
    import { code } from "../src/stores.js";
    import { getCode } from '../features/code.js'
</script>

<h1>Form</h1>
<form class="content">
  <label>Base Start</label>
    <input type="text" bind:value={$code.baseStart} />
  <label>Base Update</label>
    <input type="text" bind:value={$code.baseUpdate} />
  <label>Ship Start</label>
    <input type="text" bind:value={$code.shipStart} />
  <label>Ship Update</label>
    <input type="text" bind:value={$code.shipUpdate} />
</form>
<button on:click={getCode}>Submit Code</button>
<p>
	{JSON.stringify($code, 0, 2)}
</p>