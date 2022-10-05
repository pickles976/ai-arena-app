import {useDispatch} from 'react-redux'
import {deleteCode} from '../features/code/codeSlice'

function CodeItem({code}) {

    const dispatch = useDispatch();

    return (
        <div className="goal">
            <div>
                {new Date(code.createdAt).toLocaleString('en-US')}
            </div>
            <h2>
                {code.text}
            </h2>
            <button className="close" onClick={() => dispatch(deleteCode(code._id))}>X</button>
        </div>
    )
}

export default CodeItem