<script>
    export let object
    export let indent
</script>

<div class="field">
    {#each Object.entries(object) as [key, value]}
        {'\u2003'.repeat(indent) + key} : 
        {#if typeof value == 'object'}
            <svelte:self object={value} indent={indent + 1}/>
        {:else}
            {typeof value == "number" && key !== "uuid" ? value.toFixed(2) : value} <br>
        {/if}
    {/each}
</div>

<style>
    
    .field {
        white-space: nowrap;
        margin: auto; 
        margin-top: 1%;
        margin-bottom: 1%;
        width: 100%;
        height: 10%;
        text-align: left;
    }

</style>