<!-- https://github.com/pickles976/ai-arena-site -->

<script>
	import * as data from '../src/assets/json/doc_layout.json';
	
	// load data from json
	let objects = data.default

</script>

<h1>
	Documentation
</h1>
<div>

	<!-- List all of the categories in doc_layout.json -->
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