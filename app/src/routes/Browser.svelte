<script>
  import { onMount } from "svelte";
  import Modal, { getModal } from "../components/Modal.svelte";
  import { createChampion, deleteChampion, updateChampions } from "../features/champions";
  import { getUserCode } from "../features/code";
  import { getChampionsForUser } from "../features/champions";
  import { activeCode, auth, code } from "../stores";

    async function tryCreateChampion() {
        let result = await createChampion(champion, $auth); 
        champions = champions.concat(result)
        getModal('champion-create').close(1)
    }

    async function tryUpdateChampions() {

        if (selected.active) {
            champions.forEach(element => {
                if (element.id !== selected.id) {
                    element.active = false
                }
            });
        }

        for(let i = 0; i < champions.length; i++) {
            if (champions[i].id === selected.id) {
                champions[i] = selected
                break;
            }
        }

        champions = await updateChampions(champions); 
        getModal('champion-editor').close(1)
    }

    async function tryDeleteChampion(val) {
        let removed = await deleteChampion(val)
        champions = champions.filter((champ) => champ.id !== removed[0].id)
        getModal('champion-editor').close(1)
    }

    function loadCode(name) {
        activeCode.set(name)
    }


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

<div class='main-div'>
        <div class="vert-panel" style="align-items: center;">
            <h2 style="padding-top: 2%">Your Champions</h2>
            <div>
                <button class="btn btn-primary" on:click={() => getModal('champion-create').open()}>Create New</button>
            </div>
            <div class="vertical-list" style="overflow-y: scroll; height: 75vh;" >
                {#each champions as champion}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class='champion bg-gunmetal'>
                        <div>{champion.name}</div>
                        <div>
                            <div style='background-color: {champion.color}; width: 100%'> ⠀ </div>
                            <!-- <div>Code: {codeList.filter((code) => code.id == champion.code)[0].name}</div>  -->
                            {#if codeList.length > 0}
                                <div>Code: {codeList.filter((code) => code.id == champion.code)[0].name}</div>
                            {/if}
                            <div>Wins: {champion.wins}</div>
                            <div>Losses: {champion.losses}</div>
                            <div>Active: {champion.active}</div>
                        </div>
                        <button class="btn-custom" on:click={() => {selected = champion; getModal('champion-editor').open()}}>Edit</button>
                        <button class="btn-custom" style="float: right;" on:click={()=> {tryDeleteChampion(champion.id)}}>Delete</button>
                    </div>
                {/each}
            </div>
    </div>

    <!-- CREATE -->
    <Modal id='champion-create'>
        <h2>Create New Champion</h2>
        <form on:submit|preventDefault={tryCreateChampion}>
        <div class="form-group">
            <label for='name'>Name</label>
          <input type="name" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Champion Name" bind:value={champion.name} required={true}/>
        </div>
        <div class="form-group">
            <label for='code'>Code</label>
            <select class="form-control" bind:value={champion.code} id="code" required={true}>
                {#each codeList as code}
                    <option value={code.id}>
                        {code.name}
                    </option>
                {/each}
            </select>
        </div>
        <div class="form-group">
            <label for='color'>Color</label>
            <input class="form-control" type="color" id="head" name="head" bind:value={champion.color} required={true}/>
        </div>
        <button type="submit">Save</button>
        </form>
    </Modal>

    <!-- EDITOR -->
    <Modal id='champion-editor'>
        {#if selected}
        <h2>Edit {selected.name}</h2>
        <form on:submit|preventDefault={tryUpdateChampions}>
        <div class="form-group">
            <label for='name'>Name</label>
          <input type="name" class="form-control" id="name" bind:value={selected.name} required={true}>
        </div>
        <div class="form-group">
            <label for='code'>Code</label>
            <select class="form-control" bind:value={selected.code} id="code" required={true}>
                {#each codeList as code}
                    <option value={code.id}>
                        {code.name}
                    </option>
                {/each}
            </select>
        </div>
        <div class="form-group">
            <label for='color'>Color</label>
            <input class="form-control" type="color" id="head" name="head" bind:value={selected.color} required={true}/>
        </div>
        <div class="form-group">
            <label class="form-check-label" for="active">Set Active</label>
            <input class="form-check-input" type="checkbox" bind:checked={selected.active} id="active">
        </div>
        <!-- <button on:click={tryUpdateChampions}>Save Changes</button> -->
        <button type="submit">Save</button>
    </form>
    {/if}
    </Modal>

</div>

<style>

    .vertical-list {
        width: 25%
    }

    /* .champion:hover {
        background-color: #ffffff20;
    } */

    .champion {
        outline-width: 1px;
        outline-color: aqua;
        /* outline-style: solid; */
        margin: 2%;
        padding: 2%;
        border-radius: 6px;
    }

    .main-div { 
      height: 90%;
      width: 100vw;
      overflow-y: hidden;
      display: flex;
        justify-content: center;
    } 
  </style>