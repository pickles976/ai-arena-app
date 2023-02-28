<script>
  import { onMount } from "svelte";
  import Modal, { getModal } from "../components/Modal.svelte";
  import { getUserCode } from "../features/code";
  import { getChampionsForUser } from "../features/multiplayer";
  import { auth, code } from "../stores";

let codeList
$: codeList = []

  let champions
  $: champions = []

  let selected
  $: selected = null

  let champion
  $: champion = { name: "", color: "#00ff00", code: null}

    onMount(() => {
        getChampionsForUser($auth)
        .then((data) => champions = data)

        getUserCode()
        .then((data) => codeList = data)
    })
</script>

<div class='main-div' style="flex-direction: column;">

    <h2>Your Champions</h2>
    <button on:click={() => getModal('champion-create').open()}>Create New</button>
    <div class="vertical-list">
    {#each champions as champion}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class='champion' on:click={() => {selected = champion; getModal('champion-editor').open()}}>
            <div>{champion.name}</div>
            <div>
                <div style='background-color: {champion.color}'>stuff</div>
                <div>Code: {champion.code}</div>
                <div>Wins: {champion.wins}</div>
                <div>Losses: {champion.losses}</div>
                <div>{champion.active}</div>
            </div>
        </div>
    {/each}
    </div>

    <!-- CREATE -->
    <Modal id='champion-create'>
        <h2>Create new Champion</h2>
        <div class="vert-panel">
            <label for='name'>Name</label>
            <input id='name' name='name' type="text" bind:value={champion.name} />
            <label for='code'>Code</label>
            <select bind:value={champion.code} on:change="{(e) => champion.code = e.target.value}" id="code">
                {#each codeList as code}
                    <option value={code.id}>
                        {code.name}
                    </option>
                {/each}
            </select>
            <label for='color'>Color</label>
            <input type="color" id="head" name="head" bind:value={champion.color}/>
            <button on:click={() => {console.log(champion); getModal('champion-create').close(1)}}>Create</button>
        </div>
    </Modal>

    <!-- EDITOR -->
    <Modal id='champion-editor'>
        {#if selected}
        <h2>{selected.name}</h2>
        <div class="vert-panel">
            <label for='name'>Name</label>
            <input id='name' name='name' type="text" bind:value={selected.name} />
            <label for='code'>Code</label>
            <select bind:value={selected.code} on:change="{(e) => selected.code = e.target.value}" id="code">
                {#each codeList as code}
                    <option value={code.id}>
                        {code.name}
                    </option>
                {/each}
            </select>
            <label for='color'>Color</label>
            <input type="color" id="head" name="head" bind:value={selected.color}/>
            <label for="active">Set Active</label><br>
            <input type="checkbox" id="active" name="active" value="false">
            <button on:click={() => {console.log(selected); getModal('champion-editor').close(1)}}>Save Changes</button>
            <button on:click={() => getModal('champion-editor').close(1)}>Delete</button>
        </div>
        {/if}
    </Modal>

</div>

<style>

    .vertical-list {
        width: 25%
    }

    .champion:hover {
        background-color: #ffffff;
    }

    .champion {
        outline-width: 1px;
        outline-color: aqua;
        outline-style: solid;
        margin: 2%;
    }

    .main-div { 
      height: 90vh;
      overflow: hidden;
      display: flex;
    } 
  </style>