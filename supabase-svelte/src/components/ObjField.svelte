<script>
    export let object
</script>

<div>
    {#each Object.entries(object) as [key, value]}
        {key} : 
        {#if typeof value == 'object'}
            <svelte:self object={value}/>
        {:else}
            {value} <br>
        {/if}
    {/each}
</div>