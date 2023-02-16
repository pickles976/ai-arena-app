<script>
    import { code } from "../src/stores.js";
    import { getCode, submitCode } from '../features/code.js'
    import { auth } from "../src/stores.js";
    import {push, pop, replace} from 'svelte-spa-router'

    function trySubmitCode() {

      if (!$auth.session) {
        // Force user to log in
        alert("Please log in")
        push('/login/')
        return
      }

      if ($code.name === "") {
        // TODO: force user to enter a name for their code
        alert("Please select a name for your code")
        return
      }

      // Check if authenticated
      submitCode($code, $auth)
    }

    function tryLoadCode() {

      if (!$auth.session) {
        // Force user to log in
        alert("Please log in")
        push('/login/')
        return
      }

      getCode()
    }

</script>

<h1>Form</h1>
<form class="content">
  <label>Code name</label>
    <input type="text" bind:value={$code.name} />
  <label>Base Start</label>
    <input type="text" bind:value={$code.baseStart} />
  <label>Base Update</label>
    <input type="text" bind:value={$code.baseUpdate} />
  <label>Ship Start</label>
    <input type="text" bind:value={$code.shipStart} />
  <label>Ship Update</label>
    <input type="text" bind:value={$code.shipUpdate} />
</form>
<button on:click={trySubmitCode}>Submit Code</button>
<button on:click={tryLoadCode}>Load Code</button>
<p>
	{JSON.stringify($code, 0, 2)}
</p>