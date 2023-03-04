<script>
	import Router, {location, link} from 'svelte-spa-router';
	import Home from './routes/Home.svelte';
	import Documentation from './routes/Documentation.svelte';
  	import Login from './routes/Login.svelte';
  import DocumentationPage from './routes/DocumentationPage.svelte';
  import Test from './routes/Test.svelte';
  import Modal from './components/Modal.svelte'
  import Multiplayer from './routes/Multiplayer.svelte';
  import Browser from './routes/Browser.svelte';
</script>

<body class='bg-metalgun'>
<header class="site-header">
	<nav class="navbar navbar-expand-md navbar-dark bg-gunmetal">
		<div class="container">
			<a class="navbar-brand mr-4" href="/">AI Arena</a>
			<div class="navbar-nav mr-auto">
				<a class="nav-item nav-link" href="/#">Home</a>
				<a class="nav-item nav-link" href="/#/multiplayer">Multiplayer</a>
				<a class="nav-item nav-link" href="/#/browser">Browser</a>
				<a class="nav-item nav-link" href="/#/documentation">Documentation</a>
				<a class="nav-item nav-link" href="/#/login">Login</a>
			</div>
		</div>
	</nav>
</header>

<div class='main-div bg-metalgun'>

</div>

<Modal id='login-modal'>
	<Login />
</Modal>

<Router routes={{
	'/': Home,
	// '/test': Test,
	'/multiplayer': Multiplayer,
	'/browser' : Browser,
	'/documentation': Documentation,
	'/documentation/:object': Documentation,
	'/documentation-page/:object': DocumentationPage,
	'/login': Login,
}} />

</body>

<style>
    .main-div { 
        z-index: -10;
		position: absolute;
		top: 0;
		left: 0;
      height: 100vh;
      width: 100vw;
      overflow-y: hidden;
      display: flex;
    } 
</style>