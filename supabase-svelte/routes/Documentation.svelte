<!-- https://github.com/pickles976/ai-arena-site -->

<script>
	import Router, {location, link, params} from 'svelte-spa-router';
  	import { each } from 'svelte/internal';
	import * as data from '../src/assets/json/apidoc.json';
	
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

	{#if $params}
		<h2>{$params.object}</h2>
		<h3>Description</h3>
		<p>{objects[$params.object].Description}</p>
		<h3>Fields</h3>
		<p>{objects[$params.object].Fields}</p>
		<!-- TODO: LOOP -->
		<h3>Functions</h3>
		<p>{objects[$params.object].Functions}</p>
	{:else}
		{#each Object.entries(objects) as [key, val]}
		<div>
			<a href="/#/documentation/{key}">{key}</a>
		</div>
		{/each}
	{/if}


</div>

	<!-- {#each Object.entries(objects) as [key, val]}
	<div>
		<h2>{key}</h2>
		<h3>Description</h3>
		<p>{val.Description}</p>

		<h4>Fields</h4>
		<p>{val.Fields}</p>
		{#each Object.entries(val.Fields) as [fieldKey, fieldVal]}
			<div>
				<h4>{fieldKey}</h4>
				<p>{fieldVal}</p>
			</div>
		{/each}

		<h4>Functions</h4>
		<p>{val.Functions}</p>
	</div>
	{/each} -->