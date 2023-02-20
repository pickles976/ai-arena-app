<script>
    import { gameData } from "../stores";
    export let object
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="memory-slice bg-gunmetal" on:click={() => {$gameData.selectedUUID = object.uuid}}>
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