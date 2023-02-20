export var customCompleter = {
    getCompletions: function(editor, session, pos, prefix, callback) {
   
        var completions = [

            // utils

            { name: 'Vector2D()', description: 'Vector2D(x : number, y : number)'},
            { name: 'dist()', description: 'dist(v1 : Vector2D, v2 : Vector2D) => number'},
            { name: 'overlapCircle()', description: 'overlapCircle(pos : Vector2D, radius : number) => GameObject[]'},
            {name: 'console.log()', description: 'console.log()'},

            // Game

            { name: 'Game', description: 'Game' },
            { name: 'Game.getAsteroids()', description: 'Game.getAsteroids() => Asteroid[]' },
            { name: 'Game.getClosestAsteroid()', description: 'Game.getClosestAsteroid(pos : Vector2D) => Asteroid' },
            { name: 'Game.getEnergyCells()', description: 'Game.getEnergyCells() => EnergyCell[]' },
            { name: 'Game.getClosestEnergyCell()', description: 'Game.getClosestEnergyCell(pos : Vector2D) => EnergyCell' },
            { name: 'Game.getShips()', description: 'Game.getShips() => Ship[]' },
            { name: 'Game.getShipsByTeam()', description: 'Game.getShipsByTeam(team : number) => Ship[]'},
            { name: 'Game.getBases()', description: 'Game.getBases() => Base[]' },
            { name: 'Game.getBaseByTeam()', description: 'Game.getBaseByTeam(team : number) => Base'},
            { name: 'Game.getObjectFromUUID()', description: 'Game.getObjectFromUUID(uuid : number) => GameObject'},
            { name: 'Game.getBullets()', description: 'Game.getBullets() => Bullet[]' },
            { name: 'Game.getObstacles()', description: 'Game.getObstacles() => Obstacle[]' },
            { name: 'Game.getClosestObstacle()', description: 'Game.getClosestObstacle() => Obstacle'},

            // Graphics

            { name: 'Graphics.H', description: 'Graphics.H : number' },
            { name: 'Graphics.W', description: 'Graphics.W : number'},
            { name: 'Graphics.drawText("text", ,8,"#FFFFFF")', description: 'Graphics.drawText(text : string, pos : Vector2D, size : number, color : string)' },
            { name: 'Graphics.drawLine(,,"#FFFFFF")', description: 'Graphics.drawLine(start : Vector2D, end : Vector2D, color : string)'},
            { name: 'Graphics.drawCircle(,,"#FFFFFF")', description: 'Graphics.drawCircle(pos : Vector2D, radius : number, color : string)'},
            { name: 'Graphics.drawCircleTransparent(,,"#FFFFFF",1.0)', description: 'Graphics.drawCircleTransparent(pos : Vector2D, radius : number, color : string, alpha : number)'},
            
            // ship
            
            { name: 'ship', description: 'ship : Ship'},
            { name: 'ship.seekTarget()', description: 'ship.seekTarget(target : GameObject, speed : number)'},
            { name: 'ship.moveTo()', description: 'ship.moveTo(pos : Vector2D, speed : number)'},
            { name: 'ship.shoot()', description: 'ship.shoot(dir : Vector2D)'},

            { name: 'ship.uuid', description: 'ship.uuid : number'},
            { name: 'ship.team', description: 'ship.team : number'},
            { name: 'ship.transform', description: 'ship.transform : Transform'},
            { name: 'ship.transform.position', description: 'ship.transform.position : Vector2D'},
            { name: 'ship.transform.velocity', description: 'ship.transform.velocity : Vector2D'},
            { name: 'ship.transform.acceleration', description: 'ship.transform.acceleration : Vector2D'},

            { name: 'ship.upgradeMaxEnergy()', description: 'ship.upgradeMaxEnergy()'},
            { name: 'ship.upgradeDamage()', description: 'ship.upgradeDamage()'},
            { name: 'ship.upgradeMaxEnergyCost', description: 'ship.upgradeMaxEnergyCost : number'},
            { name: 'ship.upgradeDamageCost', description: 'ship.upgradeDamageCost : number'},

            { name: 'ship.collider', description: 'ship.collider : collider'},
            { name: 'ship.resources', description: 'ship.resources : Resources'},
            { name: 'ship.resources.metal', description: 'ship.resources.metal : number'},
            { name: 'ship.resources.water', description: 'ship.resources.water : number'},
            { name: 'ship.resources.energy', description: 'ship.resources.energy : number'},

            // base

            { name: 'base', description: 'base : Base'},

            { name: 'base.uuid', description: 'base.uuid : number'},
            { name: 'base.team', description: 'base.team : number'},
            { name: 'base.health', description: 'base.health : number'},
            { name: 'base.shipCost', description: 'base.shipCost : number'},
            { name: 'base.healRate', description: 'base.healRate : number'},
            { name: 'base.upgradeHealRateCost', description: 'base.upgradeHealRateCost : number'},
            { name: 'base.maxEnergy', description: 'base.maxEnergy : number'},
            { name: 'base.upgradeMaxEnergyCost', description: 'base.upgradeMaxEnergyCost : number'},
            { name: 'base.refiningRate', description: 'base.refiningRate : number'},
            { name: 'base.upgradeRefiningRateCost', description: 'base.upgradeRefiningRateCost : number'},
            { name: 'base.interactRadius', description: 'base.interactRadius : number'},
            { name: 'base.upgradeInteractRadiusCost', description: 'base.upgradeInteractRadiusCost : number'},
            { name: 'base.refiningEfficiency', description: 'base.refiningEfficiency : number'},
            { name: 'base.upgradeRefiningEfficiencyCost', description: 'base.upgradeRefiningEfficiencyCost : number'},
            { name: 'base.repairRate', description: 'base.repairRate : number'},
            { name: 'base.upgradeRepairRateCost', description: 'base.upgradeRepairRateCost : number'},
            { name: 'base.maxHealth', description: 'base.maxHealth : number'},
            { name: 'base.upgradeMaxHealthCost', description: 'base.upgradeMaxHealthCost : number'},

            { name: 'base.spawnShip()', description: 'base.spawnShip(energy : number)'},
            { name: 'base.upgradeHealRate()', description: 'base.upgradeHealRate()'},
            { name: 'base.upgradeMaxEnergy()', description: 'base.upgradeMaxEnergy()'},
            { name: 'base.upgradeRefiningRate()', description: 'base.upgradeRefiningRate()'},
            { name: 'base.upgradeInteractRadius()', description: 'base.upgradeInteractRadius()'},
            { name: 'base.upgradeRefiningEfficiency()', description: 'base.upgradeRefiningEfficiency()'},
            { name: 'base.upgradeRepairRate()', description: 'base.upgradeRepairRate()'},
            { name: 'base.upgradeMaxHealth()', description: 'base.upgradeMaxHealth()'},

          ];

        callback(null, completions.map(function(entry) {
            return {
                caption: entry.description,
                value: entry.name,
                meta: "ai-arena API",
            };
        }))
    }
}