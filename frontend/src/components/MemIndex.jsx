import React from 'react'

function MemIndex(props) {
  return (
    <div className='mem-index' onClick={props.callback}>
        <a style={{'margin': 'auto', 'marginLeft': '5%', 'color': '#8bcc8b' }}
        id='mem-index-text'>
          {props.type} : {props.uuid}
        </a>
    </div>
  )
}

export default MemIndex