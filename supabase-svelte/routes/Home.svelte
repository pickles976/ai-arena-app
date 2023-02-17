<script>
    import { code, defaultCode } from "../src/stores.js";
    import { getCode, submitCode } from '../features/code.js'
    import { auth } from "../src/stores.js";
    import {push, pop, replace} from 'svelte-spa-router'
    import {getAllLocalCode, storeCodeLocally } from  "../features/storage.js"
    import Modal,{getModal} from '../src/components/Modal.svelte'

    let codeObjects = {}

    // TODO: Upsert code on submit
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

    // Get a list of code from localstorage
    function tryFetchAllCode() {
      // TODO: get code from db as well
      codeObjects = getAllLocalCode()
      console.log(Object.values(codeObjects))
      getModal('load-code').open()
    }

    function tryLoadCode(name) {
      code.set(codeObjects[name])
      getModal('load-code').close(1)
    }

    function trySave() {

      // User must name code to save it
      if ($code.name === "") {
        getModal('save-as').open()
        return
      }
      storeCodeLocally($code)
      getModal('save-as').close(1)

    }

    function tryNew() {
      // TODO: Warn user about data loss
      code.set(defaultCode)
    }

</script>

<div>

  <button on:click={tryNew}>New</button>
  <button on:click={tryFetchAllCode}>Load Code</button>
  <button on:click={trySave}>Save</button>

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
  <button on:click={trySubmitCode}>Submit Code</button>

  <Modal id='save-as'>
    <h2>Save As:</h2>
    <label>Code name</label>
      <input type="text" bind:value={$code.name} />
    <button on:click={trySave}>Save</button>
  </Modal>

  <Modal id='load-code'>
    <div class="code-objects">
      {#each Object.values(codeObjects) as codeObject}
        <div>
          <p>{codeObject.name}</p>
                <!-- <p>{JSON.stringify(codeObject.code)}</p> -->
                <button on:click={() => tryLoadCode(codeObject.name)}>Open</button> 
                <!-- TODO: ADD functionality to this button -->
            </div>
      {:else}
        <!-- this block renders when photos.length === 0 -->
        <p>loading...</p>
      {/each}
    </div>
  </Modal>

</div>
<p>
	{JSON.stringify($code, 0, 2)}
</p>