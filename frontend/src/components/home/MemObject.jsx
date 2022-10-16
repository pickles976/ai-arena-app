import React from 'react'
import MemField from './MemField'

function MemObject(props) {

    const traverseObject = function(element,obj,tabs){

        for(const field in obj){
            if (typeof obj[field] !== 'function'){
    
                if (typeof obj[field] == 'object'){
                    let f = '\u2003'.repeat(tabs) + field.toUpperCase()
                    let value = ''
                    element.push((<MemField field={f} value={value}/>))
                    element = traverseObject(element,obj[field],tabs+1)
                }else{
                    let f = '\u2003'.repeat(tabs) + field.toUpperCase()
                    let value = obj[field]
                    element.push((<MemField field={f} value={value}/>))
                }
            }
        }

        return element
    
    }

    return (
        <div className='inspector-panel'>
            {
                traverseObject([], props.object, 0)
            }
        </div>
    )
}

export default MemObject