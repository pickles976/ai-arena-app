<script>
	import Router, {location, link} from 'svelte-spa-router';
	import Home from '../routes/Home.svelte';
	import Documentation from '../routes/Documentation.svelte';
  import Login from '../routes/Login.svelte';
</script>

<nav>
	<a  href="/">Home</a>
	<a href="/#/documentation">Documentation</a>
  <a href="/#/login">Login</a>
	<!-- <a href="/#/blog/colors">Colors</a> -->
</nav>

<Router routes={{
	'/': Home,
	'/documentation': Documentation,
  '/login': Login,
	// '/blog/:blogName': Blog
}} />

<hr>
/#{$location}