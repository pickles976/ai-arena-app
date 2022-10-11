import React from 'react'
import { useEffect } from 'react';
import { SetupGame } from '../features/game/game'

const WIDTH = 640
const HEIGHT = 480

function Home() {

    useEffect(() => {
        SetupGame(WIDTH, HEIGHT);
    }, []);

  return (
    <>
    <div className='home-container'>
        <div className='left-panel'>
            Code Panel
        </div>
        <div className='middle-panel'>
            <div className='game-panel'>
                <canvas id="game-canvas" width={WIDTH} height={HEIGHT} className='game-canvas'></canvas>
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