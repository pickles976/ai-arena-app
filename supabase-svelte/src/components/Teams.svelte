<script>

    import {gameData} from "../stores"

    export let ships

    $: team0 = ships["team0"]
    $: team1 = ships["team1"]
</script>

<!-- TODO: consolidate -->
<div class="main-div">
    <div>Team 0</div>
    {#if team0}
        {#each team0 as ship }
        <div class="ship bg-gunmetal" on:click={() => {$gameData.selectedUUID = ship.uuid}}>
            <div class="data-field">UUID: {ship.uuid}</div>
            <div class="data-field">Damage: {ship.damage.toFixed(1)}</div>
            <div class="data-field">Energy: {ship.resources.energy.toFixed(1)} / {ship.maxEnergy.toFixed(1)}</div>
            <div class="data-field">Metal: {ship.resources.metal.toFixed(1)}</div>
            <div class="data-field">Water: {ship.resources.water.toFixed(1)}</div>
        </div>
        {/each}
    {/if}

    <div>Team 1</div>
    {#if team1}
        {#each team1 as ship }
        <div class="ship bg-gunmetal" on:click={() => {$gameData.selectedUUID = ship.uuid}}>
            <div class="data-field">UUID: {ship.uuid}</div>
            <div class="data-field">Damage: {ship.damage.toFixed(1)}</div>
            <div class="data-field">Energy: {ship.resources.energy.toFixed(1)} / {ship.maxEnergy.toFixed(1)}</div>
            <div class="data-field">Metal: {ship.resources.metal.toFixed(1)}</div>
            <div class="data-field">Water: {ship.resources.water.toFixed(1)}</div>
        </div>
        {/each}
    {/if}
</div>

<style>

    .main-div {
        font-size: medium;
        width: 100%;
        text-align: center;
    }

    .data-field {
        padding-left: 2%; margin: -0.5%;
    }

    .ship {
        font-size: small;
        cursor: pointer; 
        margin: 2%; 
        width: 95%;
        min-width: 10%;
        display: block;
        flex-direction: column;
        text-align: left;
        white-space: nowrap;
        color: #bbb !important;
    }
</style>