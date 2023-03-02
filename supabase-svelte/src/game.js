import { BaseStart, BaseUpdate, ShipStart, ShipUpdate } from './aiControls.js'
import { stopGame, testPackage, runGame, togglePause, stepFrame, setUserCode, setCallbacks, setupLoops, setEngineConfig} from 'ai-arena'
import { getCodeFromEditor } from './editor.js'
import { Code, TeamCode } from 'ai-arena';

let memoryList, canvas, ctx

let PAUSED = false;
let TICKS_PER_FRAME = 1;
let WARP_SPEED = 8;
let RUNNING = false;

export function initGame(uiCallback, physCallback, errorCallback, code) {
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
        'physics' : physCallback,
        'error' : errorCallback
    })
    
    // Set the game configuration
    setEngineConfig({
        // @ts-ignore
        canvas: canvas,
        graphics: true,
        ticksPerFrame: TICKS_PER_FRAME,
        framerate: 60,
    })

    setUserCode({
        team0 : new TeamCode(code.baseStart,code.baseUpdate,code.shipStart,code.shipUpdate),
        team1 : new TeamCode(localStorage.getItem("Base Start") || BaseStart,
                localStorage.getItem("Base Update") || BaseUpdate,
                localStorage.getItem("Ship Start") || ShipStart,
                localStorage.getItem("Ship Update") || ShipUpdate
        )
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
// TODO: CHANGE THIS TO NOT ACCESS EDITOR DIRECTLY
export function compile(event) {
    var code = getCodeFromEditor()
    setUserCode({
        team0 : new TeamCode(
            code.baseStart,
            code.baseUpdate,
            code.shipStart,
            code.shipUpdate
        ), team1: 
        null })
};

export function run(event) {

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
    setEngineConfig({
        ticksPerFrame: TICKS_PER_FRAME
    })
    setupLoops()
    document.getElementById("pause").innerHTML = "Pause"
    document.getElementById("warp").innerHTML = TICKS_PER_FRAME === 1 ? "Warp" : "Normal"
}