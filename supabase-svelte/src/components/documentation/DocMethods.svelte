<script>
    export let object
</script>

<div>    
    <h3 class="mt-3">Methods</h3>
    {#each Object.entries(object.methods) as [key, val]}
    <div class="item mt-4">
        <div class="api p-2">
            <p><b>{key}</b> (
            {#if val.arguments}
            {#each Object.entries(val.arguments) as [arg, argtype]}
                {arg} : <a href="/#/documentation-page/{argtype}">{argtype}</a>,
            {/each}
            {/if}
            )
            -> <a href="/#/documentation-page/{val.returnType.replace("[]", "")}">{val.returnType}</a>
            </p>
        </div>
        <p>Example:</p>
        <div class="highlight p-2">
            <code>{val.usage}</code>
        </div>
        <p>Output:</p>
        <div class="highlight p-2">
            <code>{val.output}</code>
        </div>
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
    }
</style>