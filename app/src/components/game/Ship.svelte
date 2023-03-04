<script>
    import {gameData} from "../../stores"

    export let ship

        function selectObject(ship) {
        $gameData.selectedUUID = ship.uuid

        $gameData.gameObject =
        $gameData.gameObjects.filter(
            (obj) => obj?.uuid === $gameData.selectedUUID
        )[0] ?? {};
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="ship btn-custom" on:click={() => {selectObject(ship)}}>
    <div class="data-field">UUID: {ship.uuid}</div>
    <div class="data-field">Damage: {ship.damage.toFixed(1)}</div>
    <div class="data-field">Energy: {ship.resources.energy.toFixed(1)} / {ship.maxEnergy.toFixed(1)}</div>
    <div class="data-field">Metal: {ship.resources.metal.toFixed(1)}</div>
    <div class="data-field">Water: {ship.resources.water.toFixed(1)}</div>
</div>

<style>    

    .data-field {
        padding-left: 5%; 
        margin: -2.5%;
    }

    .ship {
        font-size: small;
        cursor: pointer; 
        margin: 4%; 
        width: 95%;
        min-width: 10%;
        display: block;
        flex-direction: column;
        text-align: left;
        white-space: nowrap;
        color: #bbb !important;
    }

</style>