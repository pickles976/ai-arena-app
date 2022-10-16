import { BaseStart, BaseUpdate, ShipStart, ShipUpdate } from './ai-controls.js'
import { setTicksPerFrame, stopGame, setCanvas, testPackage, runGame, togglePause, stepFrame, getGameInfo, setUICallbacks, getGameState, getShipsInfo, setShipStartCode, setShipUpdateCode, setBaseStartCode, setBaseUpdateCode, updateGameSpeed} from 'ai-arena'
// import { getCodeFromEditor } from './editor.js'

let startTime = performance.now()
let ctx;

// IN-GAME CALLBACKS
var uiCallback = (props) => {

    props.scoreCallback(getGameInfo())

    const start = performance.now()
    props.timerCallback('Timesteps: ' + ((performance.now() - startTime) * 60 / 1000).toFixed(0))

    props.gameObjectsCallback(getGameState())
    
    // // Draw all the ships on the ship panel
    // const ships = getShipsInfo()
    // if (ships['team0'] && ships['team1'])
    //     populateShipPanel(ships['team0'],document.getElementById('ship-panel-0'))
    //     populateShipPanel(ships['team1'],document.getElementById('ship-panel-1'))

    // console.log(performance.now() - start)
}

export const SetupGame = (props) => {

    // INITIALIZATION
    console.log(testPackage())

    const canvas = document.getElementById("game-canvas")
    console.log(canvas)
    setCanvas(canvas)
    ctx = canvas.getContext('2d')
    ctx.fillRect(0,0,640,480)

    setBaseStartCode(0,localStorage.getItem("Base Start") || BaseStart)
    setBaseUpdateCode(0,localStorage.getItem("Base Update") || BaseUpdate)
    setShipStartCode(0,localStorage.getItem("Ship Start") || ShipStart)
    setShipUpdateCode(0,localStorage.getItem("Ship Update") || ShipUpdate)

    let ObjectDict = {}

    let PAUSED = false;
    let TICKS_PER_FRAME = 1;
    let WARP_SPEED = 8;
    let RUNNING = false;

    setTicksPerFrame(TICKS_PER_FRAME)

    let startTime = performance.now()

    let uuid = undefined

    // BUTTON CALLBACKS
    let pause = event => {
        togglePause()
        PAUSED = !PAUSED
        document.getElementById("pause").innerHTML = PAUSED ? "Play" : "Pause"
    };
    document.getElementById("pause").addEventListener("click", pause)

    let step = event => {
        stepFrame()
        PAUSED = true
        document.getElementById("pause").innerHTML = "Play"
    };
    document.getElementById("step").addEventListener("click", step)

    // let compile = event => {
    //     var code = getCodeFromEditor()
    //     setBaseStartCode(0,code["Base Start"])
    //     setBaseUpdateCode(0,code["Base Update"])
    //     setShipStartCode(0,code["Ship Start"])
    //     setShipUpdateCode(0,code["Ship Update"])
    // };
    // document.getElementById("compile").addEventListener("click", compile)

    let run = event => {
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
    document.getElementById("run").addEventListener("click", run)

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
    document.getElementById("warp").addEventListener("click", warp)

    setUICallbacks(uiCallback.bind(uiCallback, props))
    runGame()

}

export const drawCircle = function(obj){
    if(obj && obj.transform && obj.transform.position){
        let pos = obj.transform.position
        ctx.fillStyle = "#FFFF00"
        ctx.globalAlpha = 0.3
        ctx.beginPath()
        ctx.arc(pos.x,pos.y,25,0,Math.PI*2)
        ctx.fill()
        ctx.globalAlpha = 1.0
    }
}