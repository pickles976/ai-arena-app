<script>
import { deleteCode, getCode, getUserCode, submitCode, submitCodeLambda } from '../../features/code.js'
import { code, newCode, auth, enemyCode } from "../../stores.js";
import {deleteCodeLocally, getAllLocalCode, loadLastCode, setActiveCode, storeCodeLocally } from  "../../features/storage.js"
import Modal,{getModal} from '../../components/Modal.svelte'
import { onMount } from "svelte";
import { getCodeFromEditor, initEditor, selectScript } from "../../editor.js";
import { setUserCode } from "ai-arena";
  import { TeamCode } from '../../../../../ai-arena/lib/dist/types.js';

/** Upsert user code on submission */
async function trySubmitCode() {

  submissionStatus = "running"
  codeDuration = null

  if (!$auth.session) {
    // Force user to log in
    getModal('login-modal').open()
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

  function callback(data) { 
    let message = data.message
    submissionStatus = message.status ?? "Server error, please try again."
    if (message.elapsed) {
      codeDuration = message.elapsed.toFixed(2)
    }

    // Get id of code and plug it into the local code object
    // Then save updated code locally
    getCode($code.name)
    .then((data) => $code.id = data[0].id)
    .then(() => trySave())
  }

  // Upload code
  submitCodeLambda($code, $auth, callback)
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
}

/** Try to load code into the editor*/
function tryLoadLocalCode(name) {
  code.set(localCodeObjects[name])
  initEditor($code)
  setActiveCode(name)
  getModal('load-code').close(1)
}

/** Try to load code into the editor*/
function tryLoadRemoteCode(name) {
  code.set(remoteCodeObjects[name])
  initEditor($code)
  setActiveCode(name)
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

function compile() {
  setUserCode({
    team0 : {
      BaseStartCode : $code.baseStart,
      BaseUpdateCode : $code.baseUpdate,
      ShipStartCode : $code.shipStart,
      ShipUpdateCode : $code.shipUpdate
    }
  })
}

/** Try to load code into the editor*/
function tryLoadEnemyCode(name) {
  enemyCode.set(localCodeObjects[name])
  setUserCode({
    team1 : new TeamCode(
      $enemyCode.baseStart,
      $enemyCode.baseUpdate,
      $enemyCode.shipStart,
      $enemyCode.shipUpdate
    )}
  )
  getModal('load-enemy-code').close(1)
}

let localCodeObjects = {}
let remoteCodeObjects = {}
$: submissionStatus = "running"
$: codeDuration = null

onMount(() => {
  // load code from temp storage
  $code = loadLastCode()
  initEditor($code)
})

</script>

<div style="height: 100%; width: 100%;" class="bg-steel">
<div class="vert-panel" style="height: 100%">
<div class="hor-panel" style="flex-grow: 0;">
    <!-- CODE EDITOR BUTTONS -->
  <div class="vert-panel" style="flex-direction: row;">
    <button class="btn-custom" on:click={tryNew}>New</button>
    <button class="btn-custom" on:click={() => {tryFetchAllCode(); getModal('load-code').open();}}>Load</button>
    <button class="btn-custom" on:click={trySave}>Save</button>
    <button class="btn-custom" on:click={() => {$code.name = ""; trySave()}}>Save As</button>
    <div class='code-name'>{$code.name === "" ? "untitled" : $code.name}</div>
  </div>
  <!-- SCRIPT SELECTION -->
  <div class="vert-panel" style="flex-direction: row-reverse; ">
    <select class="selector-custom" id="select-script" on:change={(e) => selectScript(e.target.value)}>
        <option class="option-custom" value="shipUpdate" selected>Ship Update</option>
        <option class="option-custom" value="shipStart">Ship Start</option>
        <option class="option-custom" value="baseUpdate">Base Update</option>
        <option class="option-custom" value="baseStart">Base Start</option>
    </select>
  </div>
</div>
<!-- EDITOR WINDOW-->
<div class="hor-panel">
  <div class="codeContainer">
    <div id="editor">// Your code here</div>
  </div>
</div>
<!-- CODE SUBMISSION PANELS -->
<div class="hor-panel" style="flex-grow: 0;">
<div class="vert-panel" style="flex-direction: row;">
    <button class="btn-custom" id="compile" on:click={compile}>Compile</button>
    <button class="btn-custom" on:click={trySubmitCode}>Submit</button>
</div>
<div class="vert-panel" style="flex-direction: row-reverse">
    <button class="btn-custom" on:click={() => {tryFetchAllCode(); getModal('load-enemy-code').open();}}>Select Enemy AI</button>
</div>
</div>
</div>


<!-- YARR, HERE BE POPUPS -->
<Modal id='submission-status'>
<h2>Submission Status</h2>
<p>Evaluation status: {submissionStatus}</p>
{#if codeDuration}
  <p>Your code ran in {codeDuration}ms!</p>
  <p>Visit the browser tab to create a Champion with this code</p>
{/if}
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
<button on:click={() => { code.set(newCode); initEditor($code); getModal('unsaved-warning').close(1)}}>Create New</button>
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


<Modal id='load-enemy-code'>
  <div class="code-objects">
  
    <!-- Just load the preset code for now -->
    <h2>Code saved locally</h2>
    {#each Object.values(localCodeObjects) as codeObject}
      <div>
        <p>{codeObject.name}</p>
              <button on:click={() => tryLoadEnemyCode(codeObject.name)}>Open</button> 
              <button on:click={() => tryDeleteLocalCode(codeObject.name)}>Delete</button> 
          </div>
    {:else}
      <!-- this block renders when localCodeObjects.length === 0 -->
      <p>loading...</p>
    {/each}

  </div>
  </Modal>
</div>

<style>
  .code-name {
    z-index: 0;
    color: #ccc;
    position: absolute;
    transform: translateX(-50%) translateX(50vw);
  }
</style>