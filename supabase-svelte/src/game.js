import { BaseStart, BaseUpdate, ShipStart, ShipUpdate } from './aiControls.js'
import { stopGame, testPackage, runGame, togglePause, stepFrame, getScore, getGameState, getShipsInfo, setUserCode, setConfig, setCallbacks} from 'ai-arena'
import { getCodeFromEditor } from './editor.js'
import { gameData } from './stores.js'
import { getAllLocalCode } from './features/storage.js'

let memoryList, canvas, ctx

let ObjectDict = {}

let PAUSED = false;
let TICKS_PER_FRAME = 1;
let WARP_SPEED = 8;
let RUNNING = false;

let startTime = performance.now()
let uuid = undefined

export function initGame(uiCallback, physCallback, code) {
    // INITIALIZATION
    console.log(testPackage())

    memoryList = document.getElementById('memory-select')
    canvas = document.getElementById("game-canvas")
    ctx = canvas.getContext('2d')
    ctx.fillRect(0,0,2000,2000)

    // Add listeners to buttons
    // TODO: move these event listeners to the buttons themselves
    document.getElementById("pause").addEventListener("click", pause)
    document.getElementById("step").addEventListener("click", step)
    document.getElementById("compile").addEventListener("click", compile)
    // document.getElementById("run").addEventListener("click", run)
    document.getElementById("warp").addEventListener("click", warp)

    // set the callbacks that the game will call during execution
    setCallbacks({
        'ui' : uiCallback,
        'physics' : physCallback
    })
    
    // Set the game configuration
    setConfig({
        canvas: canvas,
        graphics: true,
        ticksPerFrame: TICKS_PER_FRAME,
        framerate: 60,
    })

    setUserCode({
        team0 : {
            BaseStartCode : code.baseStart || BaseStart,
            BaseUpdateCode : code.baseUpdate || BaseUpdate,
            ShipStartCode : code.shipStart || ShipStart,
            ShipUpdateCode : code.shipUpdate || ShipUpdate
        },
        team1 : {
            BaseStartCode : localStorage.getItem("Base Start") || BaseStart,
            BaseUpdateCode : localStorage.getItem("Base Update") || BaseUpdate,
            ShipStartCode : localStorage.getItem("Ship Start") || ShipStart,
            ShipUpdateCode : localStorage.getItem("Ship Update") || ShipUpdate
        }
    })
    

}

// BUTTON CALLBACKS
export function pause(event) {
    togglePause()
    PAUSED = !PAUSED
    document.getElementById("pause").innerHTML = PAUSED ? "Play" : "Pause"
};

export function step(event) {
    stepFrame()
    PAUSED = true
    document.getElementById("pause").innerHTML = "Play"
};

// https://github.com/pickles976/ai-arena/blob/main/src/index.ts#L154
// TODO: CHANGE THIS
export function compile(event) {
    var code = getCodeFromEditor()
    setUserCode({
        team0 : {
            BaseStartCode : code["Base Start"],
            BaseUpdateCode : code["Base Update"],
            ShipStartCode : code["Ship Start"],
            ShipUpdateCode : code["Ship Update"]
        }
    })
};

export function run(event) {
    startTime = performance.now()

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

export function warp(event) {
    if(PAUSED){
        togglePause()
        PAUSED = false
    }
    TICKS_PER_FRAME = TICKS_PER_FRAME === 1 ? WARP_SPEED : 1
    setConfig({
        ticksPerFrame: TICKS_PER_FRAME
    })
    document.getElementById("pause").innerHTML = "Pause"
    document.getElementById("warp").innerHTML = TICKS_PER_FRAME === 1 ? "Warp" : "Normal"
}