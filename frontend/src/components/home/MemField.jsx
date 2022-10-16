import React from 'react'

function MemField(props) {
  return (
    <div className='mem-field'>
      <text style={{'margin': 'auto', 'marginLeft': '1%'}}>
        {props.field} : {props.value}
      </text>
    </div>
  )
}

export default MemField