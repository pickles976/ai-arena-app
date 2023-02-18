<!-- This is the actual documentation route. This has links to all the code documentation. -->
<script>
	import * as data from '../assets/json/doc_layout.json';
	
	// load data from json
	let objects = data.default

</script>

<div class="container-fluid">
	<h1 class="mt-4">
		Documentation
	</h1>
			<!-- List all of the categories in doc_layout.json -->
			{#each Object.entries(objects) as [key, val]}
			<div>
				<h2 class="mt-4">{key}</h2>
				{#each val as subval}
				<div>
					<a href="/#/documentation-page/{subval}">{subval}</a>
				</div>
				{/each}
			</div>
			{/each}
			<h2 class="mt-4">
				Briefing
			</h2>
			<div style="white-space: pre-line;">
				In AI-Arena you write code to control the behavior of autonomous drones in space! 
				
				The drones run code every frame that determines the moves they will take. They also run code on startup to initialize their memory. 
				You also write code to control your base. The base can purchase upgrades and manufacture other ships. 
				
				If you have ever played an RTS game you can think of the ships as your units and the base as your main base. 
				The code for your units is what an RTS player would command their units to do, while the code for the base is like the RTS
				player researching upgrades and buying more units.

				The main currencies are energy and metal. Energy can be picked up from around the map in the form of energy beacons, or it can be synthesized at a
				from water. Metal and water can be collected from resource-rich asteroids, which have bands corresponding to the amount of resources inside them.

				Brown asteroids are obstacles, which will damage your ships if you crash into them at high enough speeds.

				The user has total control over the memory that they create. There is a memory limit of 8kb so that users can't blow up the game server with 
				junk data. There is also a time limit on how long your code can run for. Ship code needs to complete in 1ms for every ship.
				
				Users can create their own functions and fields inside of their scripts-- however they cannot accesss things like the DOM, Ajax, or the game directly
				(for obvious reasons). Any default fields/functions belonging to your ships are read-only access. A player can read their team or uuid, 
				but they cannot modify it. This is to prevent players from setting their health to infinity and cheesing the game.
			</div>

		<h2 class="mt-4">Game Rules</h2>

		<div style="white-space: pre-line;">
			The objective of the game is to destroy the enemy's base before they destroy yours. Metal can be used to purchase ships and repair your base,
			while energy powers your ships, recharges your base's shields, and allows your ships to shoot bullets at the enemy.

			You can write your code and test it in the browser against the default AI, or other player's code. You can save your code locally at any time, or
			start a new file and save the old one. When you think your code is ready, you click the submit button which will send it off to the server. The server
			processes your code to make sure it's not malicious and that it runs fast enough to not lag the server. If your code upload succeedsm then your code is
			uploaded to the Galactic Conquest game server. 


			Galactic Conquest is a turn-based battle royale that your code participates in.

			In Galactic conquest you will start in control of a single star system in a massive galaxy. Your code will make one move per-turn and expand your sphere
			of control until you encounter other players on the game map. Your code will battle other player's code until eventually only one player's code remains in 
			the galaxy. You can watch this progress from the Galactic Conquest tab, or you can spectate other Galactic Conquest battles.

			I also plan to allow players to customize their strategic AI for Galactic Conquest. Meaning that users can write code to fight the battles, as well as make
			moves on the Galactic campaign map.
		</div>

	</div>

<style>
</style>