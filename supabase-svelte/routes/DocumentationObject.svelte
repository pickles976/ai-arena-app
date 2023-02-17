<!-- https://github.com/pickles976/ai-arena-site -->

<script>
	import Router, {location, link, params} from 'svelte-spa-router';
  	import { each } from 'svelte/internal';
	import * as data from '../src/assets/json/api.json';
	
	let objects=data.default
    let object = {}
	console.log(objects)

	$: if ($params) {
		console.log($params.object)
        object = objects[$params.object]
	}

</script>

<h1>
	Documentation
</h1>

{#if $params}
<div>
    <h2><a href="{object.link}">{$params.object}</a></h2>
    <h3>Description</h3>
    <p>{object.description}</p>
    <!-- FIELDS -->
    <h3>Fields</h3>
        {#each Object.entries(object.fields) as [key, val]}
            <p><b>{key}</b> type : <a href="/#/documentation-object/{val.type}">{val.type}</a></p>
            <p>{val.description}</p>
            <p>{val.usage}</p>
            <p>{val.output}</p>
        {/each}
    <!-- METHODS -->
    <h3>Methods</h3>
        {#each Object.entries(object.methods) as [key, val]}
            <p><b>{key}</b></p>
            <p>Arguments: </p>
            {#each Object.entries(val.arguments) as [arg, argtype]}
                <p>{arg} : <a href="/#/documentation-object/{argtype}">{argtype}</a> </p>
            {/each}
            <p>returns: <a href="/#/documentation-object/{val.returnType}">{val.returnType}</a></p>
            <p>Usage:</p>
            <p>{val.usage}</p>
            <p>Output:</p>
            <p>{val.output}</p>
        {/each}
</div>
{/if}