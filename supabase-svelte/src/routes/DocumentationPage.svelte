<!-- This is a singe page in the documents. It takes in a documentation page object from JSON and renders it as a page -->
<script>
	import {params} from 'svelte-spa-router';
	import * as data from '../assets/json/doc_pages.json';
  import DocFields from '../components/documentation/DocFields.svelte';
  import DocMethods from '../components/documentation/DocMethods.svelte';
	
    // load data from json
	let objects=data.default
    let object = {}

    // Select the actual page we want from the route param
	$: if ($params) {
        object = objects[$params.object]
	}

</script>

<div class="container-fluid">
	<h1 class="mt-4">
		Documentation
	</h1>

{#if $params}
<div>
    <div class="api p-2">
        <h3><a href="{object.link}">{$params.object}</a></h3>
        <p>{object.description}</p>
    </div>
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
</div>

<style>
.api {
    border-top-color: #6ab0de;
    border-top-width: 3px;
    border-top-style: solid;
    background-color: #e7f2fa;
}
</style>