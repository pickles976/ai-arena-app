import { BaseStart, BaseUpdate, ShipStart, ShipUpdate } from './ai-controls.js'
import { setTicksPerFrame, stopGame, setCanvas, testPackage, runGame, togglePause, stepFrame, getGameInfo, setUICallbacks, getGameState, getShipsInfo, setShipStartCode, setShipUpdateCode, setBaseStartCode, setBaseUpdateCode, updateGameSpeed} from 'ai-arena'
// import { getCodeFromEditor } from './editor.js'


export const SetupGame = (width, height) => {

    // INITIALIZATION
    console.log(testPackage())

    const canvas = document.getElementById("game-canvas")
    console.log(canvas)
    setCanvas(canvas)
    const ctx = canvas.getContext('2d')
    ctx.fillRect(0,0,width,height)

    setBaseStartCode(0,localStorage.getItem("Base Start") || BaseStart)
    setBaseUpdateCode(0,localStorage.getItem("Base Update") || BaseUpdate)
    setShipStartCode(0,localStorage.getItem("Ship Start") || ShipStart)
    setShipUpdateCode(0,localStorage.getItem("Ship Update") || ShipUpdate)

    let TICKS_PER_FRAME = 1;

    setTicksPerFrame(TICKS_PER_FRAME)

    runGame();

}

