<script>
      import { code, defaultCode } from "../stores.js";
    import { deleteCode, getCode, getUserCode, submitCode } from '../features/code.js'
    import { auth } from "../stores.js";
    import {push, pop, replace} from 'svelte-spa-router'
    import {deleteCodeLocally, getAllLocalCode, storeCodeLocally } from  "../features/storage.js"
    import Modal,{getModal} from '../components/Modal.svelte'
    import { onMount } from "svelte";
    import { getCodeFromEditor, initEditor, oldSessionValue, selectScript } from "../editor.js";

    /** Upsert user code on submission */
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

      trySave()

      // Popup modal with submission status
      getModal('submission-status').open()

      // Upload code
      submitCode($code, $auth)
    }

    /** Fetch code from the local storage and the server */
    function tryFetchAllCode() {

      localCodeObjects = {}
      remoteCodeObjects = {}

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

    /** Try to load code into the editor*/
    function tryLoadLocalCode(name) {
      code.set(localCodeObjects[name])
      initEditor($code)
      getModal('load-code').close(1)
    }

    /** Try to load code into the editor*/
    function tryLoadRemoteCode(name) {
      code.set(remoteCodeObjects[name])
      initEditor($code)
      getModal('load-code').close(1)
    }

    function tryDeleteLocalCode(name) {
      deleteCodeLocally(name)
      tryFetchAllCode()
    }

    async function tryDeleteRemoteCode(id) {
      deleteCode(id).then(() => tryFetchAllCode())
    }

    /** Save code from the editor into local storage, update the code global object */
    function trySave() {

      // User must name code to save it
      if ($code.name === "") {
        getModal('save-as').open()
        return
      }

      // copy editor values into code object
      let editorCode = getCodeFromEditor()
      $code.baseStart = editorCode.baseStart
      $code.baseUpdate = editorCode.baseUpdate
      $code.shipStart = editorCode.shipStart
      $code.shipUpdate = editorCode.shipUpdate

      storeCodeLocally($code)
      getModal('save-as').close(1)

    }

    function tryNew() {
      // Warn user about data loss
      getModal('unsaved-warning').open()
    }

    let localCodeObjects = {}
    let remoteCodeObjects = {}
    
    onMount(() => {
      initEditor($code)
    })
</script>

<div style="width: 40vw; max-height: 95vh; resize: horizontal; overflow: auto">
<div class="vert-panel">
    <div class="hor-panel">
        <!-- CODE EDITOR BUTTONS -->
      <div class="vert-panel" style="flex-direction: row;">
        <button on:click={tryNew}>New</button>
        <button on:click={tryFetchAllCode}>Load</button>
        <button on:click={trySave}>Save</button>
        <button on:click={() => {$code.name = ""; trySave()}}>Save As</button>
      </div>
      <!-- SCRIPT SELECTION -->
      <div class="vert-panel" style="flex-direction: row-reverse; ">
        <select class="btn-main dropdown-toggle" id="select-script" on:change={(e) => selectScript(e.target.value)}>
            <option value="shipUpdate" selected>Ship Update</option>
            <option value="shipStart">Ship Start</option>
            <option value="baseUpdate">Base Update</option>
            <option value="baseStart">Base Start</option>
        </select>
        <!-- <button on:click={() => {selectScript("baseStart")}}>Base Start</button>
        <button on:click={() => {selectScript("baseUpdate")}}>Base Update</button>
        <button on:click={() => {selectScript("shipStart")}}>Ship Start</button>
        <button on:click={() => {selectScript("shipUpdate")}}>Ship Update</button> -->
        <box>{$code.name === "" ? "untitled" : $code.name}</box>
      </div>
    </div>
    <!-- EDITOR WINDOW-->
    <div class="hor-panel">
      <div class="codeContainer">
        <div id="editor">// Your code here</div>
      </div>
    </div>
<!-- CODE SUBMISSION PANELS -->
  <div class="hor-panel">
    <div class="vert-panel" style="flex-direction: row">
        <button id="compile" on:click={() => {}}>Compile</button>
        <button on:click={trySubmitCode}>Submit</button>
    </div>
    <div class="vert-panel" style="flex-direction: row-reverse">
        <button>Select Enemy AI</button>
    </div>
  </div>
</div>


  <!-- YARR, HERE BE POPUPS -->

  <!-- TODO: replace with those little status thingies that follow you between pages -->
  <Modal id='submission-status'>
    <h2>Submission Status</h2>
    <p>Evaluation status: </p>
    <p>Your code ran in X seconds!</p>
    <button on:click={() => getModal('submission-status').close(1)}>close</button>
  </Modal>

  <Modal id='save-as'>
    <h2>Save As:</h2>
    <label>Code name</label>
      <input type="text" bind:value={$code.name} />
    <button on:click={trySave}>Save</button>
  </Modal>

  <Modal id='unsaved-warning'>
    <h2>Unsaved Progress!</h2>
    <p>All unsaved progress will be lost! are you sure you want to start a new project?</p>
    <button on:click={() => { code.set(defaultCode); initEditor($code); getModal('unsaved-warning').close(1)}}>Create New</button>
    <button on:click={() => getModal('unsaved-warning').close(1)}>Cancel</button>
  </Modal>

  <Modal id='load-code'>
    <div class="code-objects">

      <!-- Code from cookies -->
      <h2>Code saved locally</h2>
      {#each Object.values(localCodeObjects) as codeObject}
        <div>
          <p>{codeObject.name}</p>
                <button on:click={() => tryLoadLocalCode(codeObject.name)}>Open</button> 
                <button on:click={() => tryDeleteLocalCode(codeObject.name)}>Delete</button> 
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
                <button on:click={() => tryDeleteRemoteCode(codeObject.id)}>Delete</button> 
            </div>
      {:else}
        <!-- this block renders when remoteCodeObjects.length === 0 -->
        <p>loading...</p>
      {/each}
    </div>
  </Modal>
</div>