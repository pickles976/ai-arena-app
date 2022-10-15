import React, { useState } from 'react'
import { useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';
import { SetupGame } from '../utilities/game/game'

function Home() {

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

    useEffect(() => {
        SetupGame();
    }, []);

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