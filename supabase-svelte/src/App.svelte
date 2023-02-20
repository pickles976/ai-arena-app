<script>
	import Router, {location, link} from 'svelte-spa-router';
	import Home from './routes/Home.svelte';
	import Documentation from './routes/Documentation.svelte';
  	import Login from './routes/Login.svelte';
  import DocumentationPage from './routes/DocumentationPage.svelte';
  import Test from './routes/Test.svelte';
</script>

<body class='bg-metalgun'>
<header class="site-header">
	<nav class="navbar navbar-expand-md navbar-dark bg-gunmetal">
		<div class="container">
			<a class="navbar-brand mr-4" href="/">AI Arena</a>
			<div class="navbar-nav mr-auto">
				<a class="nav-item nav-link" href="/#/home">Home</a>
				<a class="nav-item nav-link" href="/#/documentation">Documentation</a>
				<a class="nav-item nav-link" href="/#/login">Login</a>
			</div>
		</div>
	</nav>
</header>

<Router routes={{
	'/home': Home,
	'/test': Test,
	'/documentation': Documentation,
	'/documentation/:object': Documentation,
	'/documentation-page/:object': DocumentationPage,
	'/login': Login,
}} />

</body>

<style>

</style>