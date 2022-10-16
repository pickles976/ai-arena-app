import { BaseStart, BaseUpdate, ShipStart, ShipUpdate } from './ai-controls'
import { setTicksPerFrame, stopGame, setCanvas, testPackage, runGame, togglePause, stepFrame, getGameInfo, setUICallbacks, getGameState, getShipsInfo, setShipStartCode, setShipUpdateCode, setBaseStartCode, setBaseUpdateCode } from 'ai-arena'
import { getCodeFromEditor } from './editor.js'
import { LoadTemplates } from './templates';

let ObjectDict = {}
let PAUSED = false;
let TICKS_PER_FRAME = 1;
let WARP_SPEED = 8;
let RUNNING = false;
let startTime = null
let uuid = undefined
let memoryList = null
let canvas = null
let ctx = null
let steps = 0

export const SetupGame = () => {

    LoadTemplates();

    // INITIALIZATION
    console.log(testPackage())

    memoryList = document.getElementById('memory-select')

    canvas = document.getElementById("game-canvas")
    setCanvas(canvas)
    ctx = canvas.getContext('2d')
    ctx.fillRect(0,0,2000,2000)

    setBaseStartCode(0,localStorage.getItem("Base Start") || BaseStart)
    setBaseUpdateCode(0,localStorage.getItem("Base Update") || BaseUpdate)
    setShipStartCode(0,localStorage.getItem("Ship Start") || ShipStart)
    setShipUpdateCode(0,localStorage.getItem("Ship Update") || ShipUpdate)

    startTime = performance.now()
    steps = 0

    setTicksPerFrame(TICKS_PER_FRAME)

    document.getElementById("pause").addEventListener("click", pause)
    document.getElementById("step").addEventListener("click", step)
    document.getElementById("compile").addEventListener("click", compile)
    document.getElementById("run").addEventListener("click", run)
    document.getElementById("warp").addEventListener("click", warp)
    setUICallbacks(callback)

}

// BUTTON CALLBACKS
let pause = event => {
    togglePause()
    PAUSED = !PAUSED
    document.getElementById("pause").innerHTML = PAUSED ? "Play" : "Pause"
};

let step = event => {
    stepFrame()
    PAUSED = true
    document.getElementById("pause").innerHTML = "Play"
};

let compile = event => {
    var code = getCodeFromEditor()
    setBaseStartCode(0,code["Base Start"])
    setBaseUpdateCode(0,code["Base Update"])
    setShipStartCode(0,code["Ship Start"])
    setShipUpdateCode(0,code["Ship Update"])
};

let run = event => {
    
    steps = 0

    if (RUNNING)
        stopGame()
    else
        try {
            runGame()
        } 
        catch(e)
        {
            alert(" Your code broke my site dude!!! \n" + e)
        }

    RUNNING = !RUNNING
    document.getElementById("run").innerHTML = RUNNING ? "Stop" : "Run"
}

let warp = event => {
    if(PAUSED){
        togglePause()
        PAUSED = false
    }
    TICKS_PER_FRAME = TICKS_PER_FRAME === 1 ? WARP_SPEED : 1
    setTicksPerFrame(TICKS_PER_FRAME)
    document.getElementById("pause").innerHTML = "Pause"
    document.getElementById("warp").innerHTML = TICKS_PER_FRAME === 1 ? "Warp" : "Normal"
}

// IN-GAME CALLBACKS
var callback = function(){

    const start = performance.now()

    const teamInfo = getGameInfo()
    const team0 = teamInfo['team 0']
    const team1 = teamInfo['team 1']

    document.getElementById('team0-kills').innerHTML = team0["kills"]
    document.getElementById('team0-deaths').innerHTML = team0["deaths"]
    document.getElementById('team0-metal').innerHTML = Math.round(team0["metal"])
    document.getElementById('team0-energy').innerHTML = Math.round(team0["energy"])

    document.getElementById('team1-kills').innerHTML = team1["kills"]
    document.getElementById('team1-deaths').innerHTML = team1["deaths"]
    document.getElementById('team1-metal').innerHTML = Math.round(team1["metal"])
    document.getElementById('team1-energy').innerHTML = Math.round(team1["energy"])

    steps++
    document.getElementById('timer').innerHTML = 'Timesteps: ' + steps


    // Draw an index for every object in the game
    const gameState = getGameState()
    drawMemoryTags(memoryList,gameState
        .filter((obj) => obj !== null && obj !== undefined)
        .sort((a, b) => a.type < b.type ? -1 : 1))

    // Load selected object into memory panel if it exists
    if(ObjectDict[uuid])
        populateMemoryPanel(ObjectDict[uuid])

    // Draw all the ships on the ship panel
    const ships = getShipsInfo()
    if (ships['team0'] && ships['team1'])
        populateShipPanel(ships['team0'],document.getElementById('ship-panel-0'))
        populateShipPanel(ships['team1'],document.getElementById('ship-panel-1'))

    // console.log(performance.now() - start)
}


// PANEL CONTROLS
const populateShipPanel = function(ships,element){

    let children = element.children

    let childIds = {}

    for (let child of children){
        childIds[child.uuid] = child
    }

    removeOrphans(element) // clear all the old fields

    for (const obj of ships){
        if (obj !== undefined && obj !== null){
            if(!(obj.uuid in childIds)){
                const child = document.createElement('ship-object')
                child.uuid = obj.uuid
                child.damage = obj.damage
                child.energy = obj.resources.energy.toFixed(1) + '/' + obj.maxEnergy
                child.metal = obj.resources.metal.toFixed(1)
                child.water = obj.resources.water.toFixed(1)
                child.addEventListener("click",()=>{memoryIndexClick(obj.uuid)})
                element.append(child)
            }else{
                const child = childIds[obj.uuid]
                child.uuid = obj.uuid
                child.damage = obj.damage
                child.energy = obj.resources.energy.toFixed(1) + '/' + obj.maxEnergy
                child.metal = obj.resources.metal.toFixed(1)
                child.water = obj.resources.water.toFixed(1)
            }
        }
    }

}

// This is what populates the memory panel with the fields of a selected object
const populateMemoryPanel = function(obj){
    const element = document.getElementById('memory-inspector')
    removeChildren(element) // clear all the old fields
    let tabs = 0
    // draw a circle
    if(obj && obj.transform){
        drawCircle(obj.transform.position)
        traverseObject(element,obj,tabs)
    }
}

const removeChildren = function(element){
    var child = element.lastElementChild; 
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

// Traverse the object as a tree and print out its fields
const traverseObject = function(element,obj,tabs){

    for(const field in obj){
        if (typeof obj[field] !== 'function'){

            if (typeof obj[field] == 'object'){
                const child = document.createElement('mem-field')
                child.field = '\u2003'.repeat(tabs) + field.toUpperCase()
                child.value = ''
                element.appendChild(child)
                traverseObject(element,obj[field],tabs+1)
            }else{
                const child = document.createElement('mem-field')
                child.field = '\u2003'.repeat(tabs) + field.toUpperCase()
                child.value = obj[field]
                element.appendChild(child)
            }
        }
    }

}

// index click callbacks
const memoryIndexClick = function(id){
    if (id in ObjectDict){
        uuid = id
        populateMemoryPanel(ObjectDict[id])
    }
}

// Each index in the memory list has a callback
const addMemoryIndex = function(element,obj){
    const child = document.createElement('mem-index')
    child.type = obj.type
    child.uuid = obj.uuid

    // add callback to open memory inspector here
    child.addEventListener("click",()=>{memoryIndexClick(obj.uuid)})
    element.appendChild(child)
}

// Draw the list of memory objects that are clickable
const drawMemoryTags = function(element,memDump){

    // removeChildren(element)
    removeOrphans(element)

    for(const obj of memDump){
        if (obj !== undefined && !(obj.uuid in ObjectDict))
            addMemoryIndex(element,obj)
    }

    ObjectDict = {}

    for (const obj of memDump){
        if (obj !== undefined)
            ObjectDict[obj.uuid] = obj
    }

}

const removeOrphans = function(element){

    for(const child of element.children){
        if (!(child.uuid in ObjectDict))
            element.removeChild(child)
    }

}

const drawCircle = function(pos){
    ctx.fillStyle = "#FFFF00"
    ctx.globalAlpha = 0.3
    ctx.beginPath()
    ctx.arc(pos.x,pos.y,25,0,Math.PI*2)
    ctx.fill()
    ctx.globalAlpha = 1.0
}

