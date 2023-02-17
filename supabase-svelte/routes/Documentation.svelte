<!-- https://github.com/pickles976/ai-arena-site -->

<script>
	import Router, {location, link, params} from 'svelte-spa-router';
  	import { each } from 'svelte/internal';
	// import * as data from '../src/assets/json/apidoc.json';
	import * as data from '../src/assets/json/api.json';
	
	let objects =data.default
	console.log(objects)

	$: if ($params) {
		console.log($params.object)
	}

</script>

<h1>
	Documentation
</h1>
<div>

	{#each Object.entries(objects) as [key, val]}
	<div>
		<a href="/#/documentation-object/{key}">{key}</a>
	</div>
	{/each}

	<!-- {#if $params}
		<h2>{$params.object}</h2>
		<h3>Description</h3>
		<p>{objects[$params.object].description}</p>
		<h3>Objects</h3>
			{#each Object.entries(objects[$params.object].fields) as [key, val]}
			<div>
				<a href="/#/documentation-object/{val}">{val}</a>
			</div>
			{/each}
		<h3>Functions</h3>
			{#each Object.entries(objects[$params.object].functions) as [key, val]}
			<div>
				<a>{val}</a>
			</div>
			{/each}
	{:else}
		{#each Object.entries(objects) as [key, val]}
		<div>
			<a href="/#/documentation/{key}">{key}</a>
		</div>
		{/each}
	{/if} -->


</div>