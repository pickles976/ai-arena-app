<script>
  import Ship from "./Ship.svelte";


    export let ships

    $: team0 = ships["team0"]
    $: team1 = ships["team1"]
</script>

<div class="main-div">
    <div>Team 0</div>
    {#if team0}
        {#each team0 as ship }
            <Ship ship={ship} />
        {/each}
    {/if}

    <div>Team 1</div>
    {#if team1}
        {#each team1 as ship }
            <Ship ship={ship} />
        {/each}
    {/if}
</div>

<style>

    .main-div {
        font-size: medium;
        width: 100%;
        text-align: center;
    }
</style>