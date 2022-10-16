import React, { useEffect, useState } from 'react'
import CodeEditor from '../components/CodeEditor';
import Game from '../components/Game';
import MemObject from '../components/MemObject';
import MemorySelector from '../components/MemorySelector';
import Score from '../components/Score';
import Timer from '../components/Timer';
import { drawCircle } from '../utilities/game/game';

function Home() {

    // State for Code
    const [sessions, setSessions] = useState({
        'Base Start' : localStorage.getItem("Base Start") || '// Your code here',
        'Base Update' : localStorage.getItem("Base Update") || '// Your code here',
        'Ship Start' : localStorage.getItem("Ship Start") || '// Your code here',
        'Ship Update' : localStorage.getItem("Ship Update") || '// Your code here',
    })

    const [currentSession, setCurrentSession] = useState('Ship Update')

    const updateSessions = (session, code) => {
        // localStorage.setItem(session, code || " ")
        setSessions(sessions => ({
            ...sessions,
            ...{ [session] : code }
        }))
    }

    const selectScript = (event) => {
        setCurrentSession(event.target.value)
    }

    // State for scores
    const [score, setScore] = useState({
        'team 0' : {
            'kills' : 0,
            'deaths' : 0,
            'metal' : 0,
            'energy' : 0,
        },
        'team 1' : {
            'kills' : 0,
            'deaths' : 0,
            'metal' : 0,
            'energy' : 0,
        }
    })

    const scoreCallback = (newScore) => {
        setScore(score => ({
            ...score,
            ...newScore
        }))
    }

    // State for Timer
    const [timer, setTimer] = useState('Timesteps: 0.0')

    const timerCallback = (value) => {
        setTimer(value)
    }

    // State for Gameobjects List
    const [gameObjects, setGameObjects] = useState([])

    const gameObjectsCallback = (value) => {
        setGameObjects(value)
    }

    // State for the GameObject we are currently inspecting
    const [currentGameObject, setCurrentGameObject] = useState({})

    const currentGameObjectCallback = (value) => {
        
        if (gameObjects !== undefined && gameObjects.length > 0){

            const go = gameObjects.filter((g) => g !== null && g.uuid === value)

            if (go.length > 0){
                // console.log(go[0])
                setCurrentGameObject(go[0])
                // TODO: remove this from the nasty-ass React loop
                drawCircle(currentGameObject)
            }
        }

    }

    useEffect(() => {
        if (currentGameObject !== undefined && currentGameObject.uuid !== undefined){
            currentGameObjectCallback(currentGameObject.uuid)
        }
    }, [gameObjects])

  return (
    <>
    <div className='home-container body-home'>
        <div className='left-panel'>
            {/* stacking */}
            <div style={{ 'margin': 'auto', 'width': '100%', 'marginTop': '-0.1%' }}>
                <div className="code-controls">
                    <div className="code-controls-container">
                        <select className="btn-main dropdown-toggle" id="select-script" defaultValue={"Ship Update"} onChange={selectScript}>
                            <option>Ship Update</option>
                            <option>Ship Start</option>
                            <option>Base Update</option>
                            <option>Base Start</option>
                        </select>
                        <button id="compile" className="btn-main">Compile</button>
                    </div>
                </div>

                <CodeEditor session={currentSession} code={sessions[currentSession]} callback={updateSessions} />
            </div>
        </div>
        <div className='middle-panel'>
            <Game scoreCallback={scoreCallback} timerCallback={timerCallback} gameObjectsCallback={gameObjectsCallback} />

            <div className="game-controls">
                <button id="run" className="btn-game">Run</button>
                <button id="pause" className="btn-game">Pause</button>
                <button id="step" className="btn-game">Step</button>
                <button id="warp" className="btn-game">Warp</button>
            </div>

            <div className='data-panel'>
                <MemorySelector gameObjects={gameObjects} callback={currentGameObjectCallback}/>
                <MemObject object={currentGameObject} />
            </div>
        </div>
        <div className='right-panel'>
            <Score score={score} />
            <Timer time={timer} />
            <div className='ship-panel'>
                Ship Panel
            </div>
        </div>
    </div>
    </>
  )
}

export default Home