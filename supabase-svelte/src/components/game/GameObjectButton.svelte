<script>
    import { gameData } from "../../stores";
    export let object

    function selectObject(object) {
        $gameData.selectedUUID = object.uuid

        $gameData.gameObject =
        $gameData.gameObjects.filter(
            (obj) => obj?.uuid === $gameData.selectedUUID
        )[0] ?? {};
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="memory-slice btn-custom" on:click={() => {selectObject(object)}}>
    {#if object}
        {object.type} : {object.uuid}
    {/if}
</div>

<style>
    
    .memory-slice {
        cursor: pointer; 
        margin: auto; 
        margin-top: 0.25%;
        margin-bottom: 0.25%;
        padding-left: 2.5%;
        width: 100%;
        height: 10%;
        display: flex;
        overflow: hidden;
        white-space: nowrap;
        text-align: left;
        color: #BBB;
        font-size: small;
    }

</style>