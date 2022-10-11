import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import logo  from '../static/logo_med.png'

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className='header'>
            <div>
                <img src={logo} className="logo" />
            </div>
            <div>
                <Link to='/'>AI-ARENA</Link>
            </div>
            <ul>
                {user ? 
                (
                <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt />Logout
                    </button>
                </li>
                ) : (
                <>
                    <li>
                        <Link to='/login'>
                            <FaSignInAlt /> Login
                        </Link>
                    </li>
                    <li>
                        <Link to='/register'>
                            <FaUser /> Register
                        </Link>
                    </li>
                </>
                )}
            </ul>
        </header>
    )
}

export default Header