<script>
	import Router, {location, link} from 'svelte-spa-router';
	import Home from './routes/Home.svelte';
	import Documentation from './routes/Documentation.svelte';
  	import Login from './routes/Login.svelte';
  import DocumentationPage from './routes/DocumentationPage.svelte';
</script>

<header class="site-header">
	<nav class="navbar navbar-expand-md navbar-dark ">
		<div class="container">
			<a class="nav-item nav-link" href="/#/home">Home</a>
			<a class="nav-item nav-link" href="/#/documentation">Documentation</a>
			<a class="nav-item nav-link" href="/#/login">Login</a>
		</div>
	</nav>
</header>

<main class="container-fluid">
	<Router routes={{
		'/home': Home,
		'/documentation': Documentation,
		'/documentation/:object': Documentation,
		'/documentation-page/:object': DocumentationPage,
		'/login': Login,
	}} />
</main>

<style>

</style>