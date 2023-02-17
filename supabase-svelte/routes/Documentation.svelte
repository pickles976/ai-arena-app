<!-- https://github.com/pickles976/ai-arena-site -->

<script>
	import Router, {location, link, params} from 'svelte-spa-router';
	import * as data from '../src/assets/json/doc_layout.json';
	
	let objects = data.default
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
		<h2>{key}</h2>
		{#each val as subval}
		<div>
			<a href="/#/documentation-page/{subval}">{subval}</a>
		</div>
		{/each}
	</div>
	{/each}

</div>