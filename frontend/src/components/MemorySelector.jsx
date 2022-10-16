import React from 'react'
import MemIndex from './MemIndex'

function MemorySelector(props) {

  return (
        <div className='memory-select'>
            { 
                props.gameObjects.map((go) => go === null ? (<></>) : (<MemIndex type={go.type} uuid={go.uuid}/>))
            }
        </div>
  )
}

export default MemorySelector