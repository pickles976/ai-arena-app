import React from 'react'
import ShipObject from './ShipObject'

function ShipPanel(props) {
  return (
    <div className='ship-panel'>
      Team 0 
      {
        props.ships['Team 0'].map((ship) => (<ShipObject ship={ship} callback={props.callback}/>))
      }
      Team 1
      {
        props.ships['Team 1'].map((ship) => (<ShipObject ship={ship} callback={props.callback}/>))
      }
    </div>
  )
}

export default ShipPanel