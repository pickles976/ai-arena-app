<script>
    export let object
</script>

<div>    
    <h3>Methods</h3>
    {#each Object.entries(object.methods) as [key, val]}
        <p><b>{key}</b></p>
        {#if val.arguments}
        <p>Arguments: </p>
        {#each Object.entries(val.arguments) as [arg, argtype]}
            <p>{arg} : <a href="/#/documentation-page/{argtype}">{argtype}</a> </p>
        {/each}
        {/if}
        <p>returns: <a href="/#/documentation-page/{val.returnType.replace("[]", "")}">{val.returnType}</a></p>
        <p>Usage:</p>
        <code>{val.usage}</code>
        <p>Output:</p>
        <code>{val.output}</code>
    {/each}
</div>

<style>
    code {
        white-space: pre-line;
    }
</style>