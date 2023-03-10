export const BaseStart = `/*
This code runs at the very start of every game and only runs once.
You can use it for storing variables related to your strategic goals. 
Here I am determining how much energy I want each ship to have when I spawn it in.
These variables will be used in the Base Update script.
*/
console.log("Hello, world!")
base.energyPerShip = 100
base.shipEnergy = 50
`


export const BaseUpdate = 
`/*
This code runs for your base object every update. This example is just a bunch of if statements that
check whether or not to guy certain upgrades.
*/
if (base.resources.metal > base.shipCost && base.resources.energy > base.energyPerShip * Game.getShipsByTeam(base.team).length){
base.spawnShip(base.shipEnergy,false)
}

Graphics.drawText(base.resources.toString() + ' Health: ' + base.health.toFixed(2),base.transform.position.subtract(new Vector2D(100,0)),15,"#FFFFFF")
`

export const ShipStart = 
`/*
This code gets run once every time a new ship is created. 
It can be used to define your own variables. Here I am using it to create variables
that store a state for a state machine, some timer variables to determine how often to shoot, 
and a target object that can be used to keep tabs on what object my ship is moving towards.
*/
ship.target = undefined
ship.speed = 2.5
`

export const ShipUpdate = 
`/*
Demo Ship AI code.
This code gets run once every frame to determine what actions your ships (RED) will take.
Try tweaking the code and seeing what changes! You can also visit the docs to get a better understanding of the API.

You can modify other behavior scripts too. Click the dropdown at the top-right of the editor
to see what other behaviors are available.
*/
if (!ship.target || ship.target.type === "DEAD") {
ship.target = Game.getClosestAsteroid(ship.transform.position)
}

ship.seekTarget(ship.target, ship.speed)
console.log(ship.target)

// DEBUG DRAWING
Graphics.drawText(ship.resources.toString(),ship.transform.position,15,"#FFFFFF")
if (ship.target != undefined && ship.target.transform != undefined)
Graphics.drawLine(ship.transform.position,ship.target.transform.position,"#00FF00")`