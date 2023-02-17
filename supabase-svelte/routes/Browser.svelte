<script>
    import { code } from "../src/stores.js";
    import { getCode, getUserCode, submitCode } from '../features/code.js'
    import { auth } from "../src/stores.js";
    import {push, pop, replace} from 'svelte-spa-router'
    import { onMount } from 'svelte';

    let codeObjects = []

    async function tryLoadCode() {

      if (!$auth.session) {
        // Force user to log in
        alert("Please log in")
        push('/login/')
        return
      }

      getUserCode().then((res) => codeObjects = res)

    }
    
    onMount(async () => {
		await tryLoadCode()
	});

</script>

<div class="code-objects">
	{#each codeObjects as codeObject}
		<div>
			<p>{codeObject.name}</p>
            <p>{JSON.stringify(codeObject.code)}</p>
            <button>Open</button> 
            <!-- TODO: ADD functionality to this button -->
        </div>
	{:else}
		<!-- this block renders when photos.length === 0 -->
		<p>loading...</p>
	{/each}
</div>

