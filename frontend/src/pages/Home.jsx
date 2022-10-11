import React from 'react'
import { useEffect } from 'react';
import { SetupGame } from '../features/game/game'

function Home() {

    useEffect(() => {
        SetupGame();
    }, []);

  return (
    <>
    <div className='home-container body-home'>
        <div className='left-panel'>
            Code Panel
        </div>
        <div className='middle-panel'>
            <div className='game-panel'>
                <canvas id="game-canvas" className='game-canvas'></canvas>
            </div>

            <div className="game-controls">
                <button id="run" className="btn-game">Run</button>
                <button id="pause" className="btn-game">Pause</button>
                <button id="step" className="btn-game">Step</button>
                <button id="warp" className="btn-game">Warp</button>
            </div>

            <div className='data-panel'>
                <div className='gameObject-panel'>
                    Game Object Panel
                </div>
                <div className='inspector-panel'>
                    Inspector Panel
                </div>
            </div>
        </div>
        <div className='right-panel'>
            <div className='score-panel'>
                Score Panel
            </div>
            <div className='ship-panel'>
                Ship Panel
            </div>
        </div>
    </div>
    </>
  )
}

export default Home