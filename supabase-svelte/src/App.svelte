<script>
	import Router, {location, link} from 'svelte-spa-router';
	import Home from '../routes/Home.svelte';
	import Documentation from '../routes/Documentation.svelte';
  	import Login from '../routes/Login.svelte';
	import { auth } from './stores';
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
  	'/login': Login,
	// '/blog/:blogName': Blog
}} />

<hr>
/#{$location}

<p>
	{JSON.stringify($auth, 0, 2)}
</p>