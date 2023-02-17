<!-- https://github.com/pickles976/ai-arena-site -->

<script>
	import Router, {location, link, params} from 'svelte-spa-router';
	import * as data from '../src/assets/json/apidoc.json';

	console.log(data)
	console.log($params.object)
	
</script>

<h1>
	Documentation
</h1>
<div>

	<h2>Game Concepts</h2>
	<p>
		In AI-Arena you write code to control the behavior of autonomous drones in space! The drones have their own code they run every frame
		to decide what actions to take. They also run code on startup to initialize their memory. You also write code to control your base. The base can 
		purchase upgrades, and manufacture other ships. If you have ever played an RTS game you can think of the ships as your units and the base 
		as your main building. The code for your units is what an RTS player would command their units to do, while the code for the base is like the RTS
		player researching upgrades and buying more units.

		The main currencies are energy and metal. Energy can be picked up from around the map in the form of energy beacons, or it can be synthesized at a
		from water. Metal and water can be collected from resource-rich asteroids, which have bands corresponding to the amount of resources inside them.

		Brown asteroids are obstacles, which will damage your ships if you crash into them at high enough speeds.

		The user has total control over the memory that they create. There is a memory limit of 8kb so that users can't blow up the game server with 
		junk data. There is also a time limit on how long your code can run for. Ship code needs to complete in 1ms for every ship.
		
		Users can create their own functions and fields inside of their scripts-- however they cannot accesss things like the DOM, Ajax, or the game directly
		(for obvious reasons). Any default fields/functions belonging to your ships are read-only access. A player can read their team or uuid, 
		but they cannot modify it. This is to prevent players from setting their health to infinity and cheesing the game.
	</p>

	<h2>Global Objects</h2>

	<p>    
		Fields: ['console', 'Math', 'Vector2D', 'overlapCircle', 'dist', 'H', 'W', 'performance']

		// TODO: usage of each field
	</p>

	<h2>Game Objects</h2>

	<p>
		Every object in the game is a game object. You can query different information about the objects like you would any javascript object.
		
		The read-only fields on a game object are:

		Fields: ['transform', 'collider', 'resources']

		The transform has position and velocity data about the game object.
		The collider stores the radius of the game object.
		The resources field stores the amount of metal, water, and energy contained in an object.
	</p>

	<h2>Base</h2>

	<p>
		Fields : [
			'uuid',
            'team',
            'health',
            'shipCost',
			'healRate',
            'upgradeHealRateCost',
			'maxEnergy',
            'upgradeMaxEnergyCost',
			'refiningRate',
            'upgradeRefiningRateCost',
			'interactRadius',
            'upgradeInteractRadiusCost',
			'refiningEfficiency',
            'upgradeRefiningEfficiencyCost',
			'repairRate',
            'upgradeRepairRateCost',
			'maxHealth',
            'upgradeMaxHealthCost',
		]

		Functions : [
            'spawnShip',
            'upgradeHealRate',
            'upgradeMaxEnergy',
            'upgradeRefiningRate',
            'upgradeInteractRadius',
            'upgradeRefiningEfficiency',
            'upgradeRepairRate',
            'upgradeMaxHealth',
        ]
	</p>

	<h3>Start</h3>

	<h3>Update</h3>

	<h2>Ship</h2>

		<p>
			Functions: [
				'upgradeMaxEnergy',
				'upgradeDamage',
				'seekTarget',
				'moveTo',
				'shoot',
			]

			Fields: [
				'uuid',
				'team',
				'maxEnergy',
				'damage',
				'upgradeMaxEnergyCost',
				'upgradeDamageCost',
			]
		</p>

	<h3>Start</h3>

	<h3>Update</h3>

	<h2>Game</h2>

		<p>
			Fields: ["H", "W"]

			Functions: ['getAsteroids',
            'getClosestAsteroid',
            'getObstacle',
            'getClosestObstacle',
            'getEnergyCells',
            'getClosestEnergyCell',
            'getShips',
            'getShipsByTeam',
            'getBullets',
            'getBases',
            'getBaseByTeam',]
		</p>

	<h2>Graphics</h2>

	<p>
		The available default fields for Graphics are:

		Fields: ["H", "W"]

		Functions: ["drawText", "drawLine", "drawCircle", "drawCircleTransparent"]

		These are functions that can be used to draw on the screen. These are useful for debugging your ships. On the server drawing is disabled, so they
		shouldn't incur much of a performance penalty if left in your code.

		Example usage of Graphics object:

		let H = Graphics.H
		Graphics.drawCircle(new Vector2D(0,H),100,"#FFFF00")
	</p>


</div>