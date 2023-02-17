<script>
	import Router, {location, link} from 'svelte-spa-router';
	import Home from '../routes/Home.svelte';
	import Documentation from '../routes/Documentation.svelte';
  	import Login from '../routes/Login.svelte';
	import { auth } from './stores';
  import DocumentationPage from '../routes/DocumentationPage.svelte';
</script>

<nav>
	<a  href="/#/home">Home</a>
	<a href="/#/documentation">Documentation</a>
  	<a href="/#/login">Login</a>
	<!-- <a href="/#/blog/colors">Colors</a> -->
</nav>

<Router routes={{
	'/home': Home,
	'/documentation': Documentation,
	'/documentation/:object': Documentation,
	'/documentation-page/:object': DocumentationPage,
  	'/login': Login,
	// '/blog/:blogName': Blog
}} />
