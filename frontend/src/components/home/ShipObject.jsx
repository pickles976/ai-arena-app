import React from 'react'

function ShipObject(props) {
  return (
    <div className='ship-object' onClick={props.callback.bind(props.callback, props.ship.uuid)}>
        <div>
          <text className='ship-text'>UUID : {props.ship.uuid}</text>
        </div>
        <div>
          <text className='ship-text'>Damage : {props.ship.damage}</text>
        </div>
        <div>
          <text className='ship-text'>Energy : {props.ship.resources.energy}</text>
        </div>
        <div>
          <text className='ship-text'>Metal : {props.ship.resources.metal}</text>
        </div>
        <div>
          <text className='ship-text'>Water : {props.ship.resources.water}</text>
        </div>
    </div>
  )
}

export default ShipObject