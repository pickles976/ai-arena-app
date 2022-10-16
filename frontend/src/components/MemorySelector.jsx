import React from 'react'
import MemIndex from './MemIndex'

function MemorySelector(props) {

  return (
        <div className='memory-select'>
            { 
                // Jesus Christ
                props.gameObjects.map((go) => go === null ? (<></>) : (<MemIndex type={go.type} uuid={go.uuid} callback={props.callback.bind(props.callback, go.uuid)}/>))
            }
        </div>
  )
}

export default MemorySelector