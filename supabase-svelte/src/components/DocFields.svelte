<script>
    export let object
</script>
<div>
    <h3>Fields</h3>
    {#each Object.entries(object.fields) as [key, val]}
        <p><b>{key}</b> type : <a href="/#/documentation-page/{val.type}">{val.type}</a></p>
        <p>{val.description}</p>
        <code>{val.usage}</code>
        {#if val.output}
        <p>Output:</p>
        <code>{val.output}</code>
        {/if}
    {/each}
</div>