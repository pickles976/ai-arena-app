import React from 'react'
import { useEffect } from 'react';
import { SetupGame } from '../utilities/game/game';

function Game(props) {

    useEffect(() => {
        SetupGame(props.scoreCallback, props.timerCallback);
    }, []);

  return (
    <div className='game-panel'>
        <canvas id="game-canvas" className='game-canvas'></canvas>
    </div>
  )
}

export default Game