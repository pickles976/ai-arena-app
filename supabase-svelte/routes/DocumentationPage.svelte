<!-- https://github.com/pickles976/ai-arena-site -->

<script>
	import {params} from 'svelte-spa-router';
	import * as data from '../src/assets/json/doc_pages.json';
  import DocFields from '../src/components/DocFields.svelte';
  import DocMethods from '../src/components/DocMethods.svelte';
	
    // load data from json
	let objects=data.default
    let object = {}

    // Select the actual page we want from the route param
	$: if ($params) {
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
    {#if object.fields}
        <DocFields object={object}/>
    {/if}
    <!-- METHODS -->
    {#if object.methods}
        <DocMethods object={object} />
    {/if}
</div>
{/if}