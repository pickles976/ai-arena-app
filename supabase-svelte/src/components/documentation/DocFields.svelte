<script>
    export let object
</script>
<div>
    <h4 class="mt-3">Fields</h4>
    {#each Object.entries(object.fields) as [key, val]}
    <div class="item mt-4">
        <div class="api p-2">
            <p><b>{key}</b> : <a href="/#/documentation-page/{val.type}">{val.type}</a></p>
            <p>{val.description}</p>
        </div>
        <p class="pt-2">Example:</p>
        <div class="highlight p-2">
            <code>{val.usage}</code>
        </div>
        {#if val.output}
        <p class="pt-2">Output:</p>
        <div class="highlight p-2">
            <code>{val.output}</code>
        </div>
        {/if}
    </div>
    {/each}
</div>

<style>
    .highlight {
        background-color: #eeffcc;
        white-space: pre-line;
    }

    .api {
        border-top-color: #6ab0de;
        border-top-width: 3px;
        border-top-style: solid;
        background-color: #e7f2fa;
        font-size: large;
    }
</style>