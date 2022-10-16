import React from 'react'

function Timer(props) {
  return (
    <div className="timer-panel">
        <text id="timer" style={{'paddingTop': '0.5vh'}}>{props.time}</text>
    </div>
  )
}

export default Timer