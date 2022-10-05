import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {createCode} from '../features/code/codeSlice'

function CodeForm() {

    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

        dispatch(createCode({text}))
        setText('')
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='text'>Code</label>
                    <input type='text' name='text' id='text' value={text} onChange={(e) => setText(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button className='btn btn-block' type='submit'>
                        Add Code
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CodeForm