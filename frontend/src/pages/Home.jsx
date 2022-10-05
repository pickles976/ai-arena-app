import React from 'react'

function Home() {
  return (
    <>
    <div className='home-container'>
        <div className='left-panel'>
            Code Panel
        </div>
        <div className='middle-panel'>
            <div className='game-panel'>
                Game Panel
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