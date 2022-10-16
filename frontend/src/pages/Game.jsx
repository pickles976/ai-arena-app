import React from 'react'
import { useEffect } from 'react'
import { SetupEditor } from '../utilities/game/editor';
import { SetupGame } from '../utilities/game/game';

function Game() {

    useEffect(() => {
        SetupGame();
        SetupEditor();
    }, [])

  return (
    <div className="home-container body-home">

            {/* <!-- LEFT PANE --> */}
            <div className="left-panel">
                {/* <!-- stacking --> */}
                <div style={{'margin': 'auto', 'width': '100%', 'marginTop': '-0.1%'}}>

                    {/* <!-- CODE CONTROLS --> */}
                    <div className="code-controls">
                        <div className="code-controls-container">
                            <select className="btn-main dropdown-toggle" id="select-script" defaultValue={'Ship Update'}>
                                <option>Ship Update</option>
                                <option>Ship Start</option>
                                <option>Base Update</option>
                                <option>Base Start</option>
                            </select>
                            <button id="compile" className="btn-main">Compile</button>
                        </div>
                    </div>

                    {/* <!-- EDITOR WINDOW--> */}
                    <div className="code-container">
                        <div id="editor">// Your code here</div>
                    </div>
                </div>
            </div>

            {/* <!-- MIDDLE PANE --> */}
            <div className="middle-panel">

                {/* <!-- CANVAS CONTAINER--> */}
                <div className="canvas-container">
                    <canvas id="game-canvas" width="1080" height="720" className="game-canvas"></canvas>
                </div>

                <div className="game-controls">
                    <button id="run" className="btn-main">Run</button>
                    <button id="pause" className="btn-main">Pause</button>
                    <button id="step" className="btn-main">Step</button>
                    <button id="warp" className="btn-main">Warp</button>
                </div>

                {/* <!-- MEMORY CONTAINER--> */}
                <div className="memory-container">

                    {/* <!-- MEMORY SELECTION --> */}
                    <div id="memory-select" className="memory-select">
                        {/* <!-- ITEM INDEXES GO HERE --> */}
                    </div>

                    {/* <!-- MEMORY INSPECTION--> */}
                    <div id="memory-inspector" className="memory-inspect">
                        {/* <!-- ITEM FIELDS GO HERE --> */}
                    </div>
                </div>
            </div>

            {/* <!-- RIGHT PANE --> */}
            <div className="right-panel">

                <div className="score-panel">
                    <div className="teams-info" id="teams-info">
                            <div className="container-alt row">
                                <div className="col-left">
                                    <div className="cell">Values</div>
                                    <div className="cell">Kills</div>
                                    <div className="cell">Deaths</div>
                                    <div className="cell">Metal</div>
                                    <div className="cell">Energy</div>
                                </div>
                                <div className="col-middle">
                                    <div className="cell">Team 0</div>
                                    <div className="cell" id='team0-kills'>0</div>
                                    <div className="cell" id='team0-deaths'>0</div>
                                    <div className="cell" id='team0-metal'>0</div>
                                    <div className="cell" id='team0-energy'>0</div>
                                </div>
                                <div className="col-right">
                                    <div className="cell">Team 1</div>
                                    <div className="cell" id='team1-kills'>0</div>
                                    <div className="cell" id='team1-deaths'>0</div>
                                    <div className="cell" id='team1-metal'>0</div>
                                    <div className="cell" id='team1-energy'>0</div>
                                </div>
                            </div>
                    </div>
                </div>

                {/* <!-- TIMER --> */}
                <div className="timer-panel">
                    <text id="timer" style={{'paddingTop' : '0.5vh'}}></text>
                </div>

                {/* <!-- SHIP INFO --> */}
                <div id='ship-panel' className="ship-panel">
                    <label>Team 0</label>
                    <div id='ship-panel-0'>
                        {/* <!-- TODO: PUT INFO ABOUT SHIPS HERE --> */}
                    </div>
        
                    <label>Team 1</label>
                    <div id='ship-panel-1'>
                        {/* <!-- TODO: PUT INFO ABOUT SHIPS HERE --> */}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Game