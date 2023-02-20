<script>
    export let ships

    $: team0 = ships["team0"]
    $: team1 = ships["team1"]
</script>

<!-- TODO: consolidate -->
<div>
    <div>Team 0</div>
    {#if team0}
        {#each team0 as ship }
        <div>UUID: {ship.uuid}</div>
        <div>Damage: {ship.damage}</div>
        <div>Energy: {ship.resources.energy}</div>
        <div>Metal: {ship.resources.metal}</div>
        <div>Water: {ship.resources.water}</div>
        {/each}
    {/if}

    <div>Team 1</div>
    {#if team1}
        {#each team1 as ship }
        <div>UUID: {ship.uuid}</div>
        <div>Damage: {ship.damage}</div>
        <div>Energy: {ship.resources.energy}</div>
        <div>Metal: {ship.resources.metal}</div>
        <div>Water: {ship.resources.water}</div>
        {/each}
    {/if}
</div>

<style>

</style>