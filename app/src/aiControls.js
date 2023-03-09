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

if (base.resources.metal > base.upgradeMaxEnergyCost){
    base.upgradeMaxEnergy()
}

if (base.resources.metal > base.upgradeRefiningEfficiencyCost){
    base.upgradeRefiningEfficiency()
}

if (base.resources.metal > base.upgradeInteractRadiusCost){
    base.upgradeInteractRadius()
}

if (base.resources.metal > base.upgradeMaxHealthCost){
    base.upgradeMaxHealth()
}

if (base.resources.metal > base.upgradeHealRateCost){
    base.upgradeHealRate()
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
ship.target = {}
ship.state = "IDLE"
ship.arr = []
ship.shootCooldown = 10
ship.shootTimer = 0
console.log("Ship start!")
`

export const ShipUpdate = 
`/*
    Demo Ship AI code.
    This code gets run once every frame to determine what actions your ships (RED) will take.
    Try tweaking the code and seeing what changes! You can also visit the docs to get a better understanding of the API.

    You can modify other behavior scripts too. Click the dropdown at the top-right of the editor
    to see what other behaviors are available.
*/

const speed = 2.5
ship.shootTimer--

// STATE MACHINE
switch(ship.state){

    case "IDLE":

        ship.target = Game.getClosestAsteroid(ship.transform.position)
        ship.state = "MOVE_TO_ASTEROID"
        break;

    case "MOVE_TO_ASTEROID":

        if (ship.target.type === "ASTEROID"){
            ship.seekTarget(ship.target,speed)
        }else{
            ship.target = base
            ship.state = "MOVE_TO_BASE"
        }

        break;

    case "MOVE_TO_BASE":

        if (ship.resources.metal > 0 || ship.resources.water > 0 && dist(ship,base) > base.interactRadius){
            ship.seekTarget(ship.target,speed)
        }else{
            ship.state = "IDLE"
        }

        break;

    case "MOVE_TO_ENERGY":
        if (ship.target.type === "ENERGY_CELL"){
            ship.seekTarget(ship.target,speed)
        }else if (ship.target.type === "BASE") {
            if (ship.resources.energy > 90 || base.resources.energy < 1 || dist(ship,base) > base.interactRadius){
                ship.state = "IDLE"
            }else{
                ship.seekTarget(ship.target,speed)
            }
        }
        else{
            ship.state = "IDLE"
        }
        break;
        
}

// seekTarget ENERGY
if (ship.resources.energy < (ship.maxEnergy / 3)){

    ship.target = Game.getClosestEnergyCell(ship.transform.position)
    ship.state = "MOVE_TO_ENERGY"
}

// COMBAT
if(ship.resources.energy > (ship.maxEnergy / 2) && ship.shootTimer < 0){
    
    const shootRadius = 300
    const ships = Game.getShips()
    
    let closest = [{},100000]

    for (const index in ships){
        const otherShip = ships[index]
        if (otherShip.team != ship.team){
            const d = dist(ship,otherShip)
            if (d < closest[1]){
                closest = [otherShip,d]
            }
        }
    }

    if (closest[1] < shootRadius){
        ship.shoot(closest[0].transform.position.add(closest[0].transform.velocity.multiply(720)).subtract(ship.transform.position))
        ship.shootTimer = ship.shootCooldown
    }
}

// UPGRADES
if (base.resources.metal > ship.upgradeMaxEnergyCost && Game.getShipsByTeam(ship.team).length > 2){
    ship.upgradeMaxEnergy()
}

if (base.resources.metal > ship.upgradeDamageCost && Game.getShipsByTeam(ship.team).length > 2){
    ship.upgradeDamage()
}

// DEBUG DRAWING
Graphics.drawText(ship.resources.toString(),ship.transform.position,15,"#FFFFFF")
Graphics.drawText(ship.state,ship.transform.position.subtract(new Vector2D(1,1).multiply(-20)),15,"#FFFFFF")
if (ship.target != undefined && ship.target.transform != undefined)
    Graphics.drawLine(ship.transform.position,ship.target.transform.position,"#00FF00")
`