export const BaseStart = 'let t = "test"'


export const BaseUpdate = 
`const energyPerShip = 100
const shipEnergy = 50

if (base.resources.metal > base.shipCost && base.resources.energy > energyPerShip * Game.getShipsByTeam(base.team).length){
    base.spawnShip(shipEnergy,false)
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

Graphics.drawText(base.resources.toString() + ' Health: ' + base.health.toFixed(2),base.transform.position.subtract(new Vector2D(100,0)),12,"#FFFFFF")
`

export const ShipStart = 
`ship.target = {}
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
    There is no documentation ATM, but try tweaking the code and seeing what changes!

    You can modify other behavior scripts too. Click the dropdown at the top-left of the page
    to see what other behaviors are available.
*/

const speed = 2.5
ship.shootTimer--

function teammateHasTarget(target){
    const teamShips = Game.getShipsByTeam(ship.team).filter((obj) => obj.uuid != ship.uuid)

    teamShips.forEach(s => {
        if (target != null && target != undefined && s.target.uuid == target.uuid)
            return true
    })

    return false
}

// STATE MACHINE
switch(ship.state){

    case "IDLE":

        const asteroids = Game.getAsteroids()
        let closest = [{},100000]

        asteroids.forEach(asteroid => {
            const d = dist(asteroid,ship)
            if (d < closest[1] && !teammateHasTarget(asteroid)){
                closest = [asteroid,d]
            }
        })

        ship.target = closest[0]
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
    const energyCells = Game.getEnergyCells()

    let closest = [base,dist(base,ship)]

    energyCells.forEach(e => {
        const d = dist(e,ship)
        if (d < closest[1]){
            if (!teammateHasTarget(e)){
                closest = [e,d]
            }
        } 
    })

    ship.target = closest[0]
    ship.state = "MOVE_TO_ENERGY"
}

// COMBAT
if(ship.resources.energy > (ship.maxEnergy / 2) && ship.shootTimer < 0){
    const shootRadius = 300
    const ships = Game.getShips()
    
    let closest = [{},100000]

    ships.forEach(other => {
        if (other.team != ship.team){
            const d = dist(ship,other)
            if (d < closest[1]){
                closest = [other,d]
            }
        }
    })

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

ship.targetID = ship.target.uuid

// DEBUG DRAWING
Graphics.drawText(ship.resources.toString(),ship.transform.position,10,"#FFFFFF")
Graphics.drawText(ship.state,ship.transform.position.subtract(new Vector2D(0,1).multiply(-10)),8,"#FFFFFF")
if (ship.target != undefined && ship.target.transform != undefined)
    Graphics.drawLine(ship.transform.position,ship.target.transform.position,"#00FF00")
`