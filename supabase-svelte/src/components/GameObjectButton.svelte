<script>
    import { gameData } from "../stores";
    export let object
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="memory-slice bg-gunmetal" on:click={() => {$gameData.gameObject = object}}>
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
        width: 100%;
        height: 5%;
        display: flex;
        overflow: hidden;
        white-space: nowrap;
        /* flex-grow: 0; */
        /* align-self: auto; */
    }

</style>