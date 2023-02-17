<script>
    import { code, defaultCode } from "../src/stores.js";
    import { getCode, getUserCode, submitCode } from '../features/code.js'
    import { auth } from "../src/stores.js";
    import {push, pop, replace} from 'svelte-spa-router'
    import {getAllLocalCode, storeCodeLocally } from  "../features/storage.js"
    import Modal,{getModal} from '../src/components/Modal.svelte'

    let localCodeObjects = {}
    let remoteCodeObjects = {}

    // Upsert ccode on submit
    function trySubmitCode() {

      if (!$auth.session) {
        // Force user to log in
        alert("Please log in")
        push('/login/')
        return
      }

      if ($code.name === "") {
        // Force user to enter a name for their code
        trySave()
        return
      }

      // Check if authenticated
      submitCode($code, $auth)

      // TODO: popup modal with submission status
    }

    // Get a list of code from localstorage
    function tryFetchAllCode() {

      // Get code from db
      if ($auth.session) {
        getUserCode().then((data) => {
          data.forEach((entry) => {
            remoteCodeObjects[entry.name] = entry.code
            remoteCodeObjects[entry.name].id = entry.id // id needed for upsert
          })
        })
      }


      localCodeObjects = getAllLocalCode()
      getModal('load-code').open()
    }

    function tryLoadLocalCode(name) {
      code.set(localCodeObjects[name])
      getModal('load-code').close(1)
      localCodeObjects = {}
      remoteCodeObjects = {}
    }

    function tryLoadRemoteCode(name) {
      code.set(remoteCodeObjects[name])
      getModal('load-code').close(1)
      localCodeObjects = {}
      remoteCodeObjects = {}
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

      <!-- Code from cookies -->
      <h2>Code saved locally</h2>
      {#each Object.values(localCodeObjects) as codeObject}
        <div>
          <p>{codeObject.name}</p>
                <!-- <p>{JSON.stringify(codeObject.code)}</p> -->
                <button on:click={() => tryLoadLocalCode(codeObject.name)}>Open</button> 
            </div>
      {:else}
        <!-- this block renders when localCodeObjects.length === 0 -->
        <p>loading...</p>
      {/each}

      <!-- Code from server -->
      <h2>Code on this account</h2>
      {#each Object.values(remoteCodeObjects) as codeObject}
        <div>
          <p>{codeObject.name}</p>
                <!-- <p>{JSON.stringify(codeObject.code)}</p> -->
                <button on:click={() => tryLoadRemoteCode(codeObject.name)}>Open</button> 
            </div>
      {:else}
        <!-- this block renders when remoteCodeObjects.length === 0 -->
        <p>loading...</p>
      {/each}
    </div>
  </Modal>

</div>