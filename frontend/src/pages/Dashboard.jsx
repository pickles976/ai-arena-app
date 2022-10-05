import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CodeForm from '../components/CodeForm'
import Spinner from '../components/Spinner'
import { getCode, reset } from '../features/code/codeSlice'
import CodeItem from '../components/CodeItem'

function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {user} = useSelector((state) => state.auth)
  const {code, isLoading, isError, message} = useSelector((state) => state.code)

  useEffect(() => {

    if(isError){
      console.log(message)
    }

    // redirect to login page if not logged in
    if(!user){
      navigate('/login')
    }

    dispatch(getCode())

    // clear state on unmount
    return () => {
      dispatch(reset())
    }
  }
  , [user, navigate, isError, message, dispatch])

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>code Dashboard</p>
      </section>
      <CodeForm />

      <section className='content'>
        {code.length > 0 ? 
        (
        <div className='code'>
            {code.map((code) => (
              <CodeItem key={code._id} code={code} />
            ))}
        </div>
        ) : (
        <h3>You have not set any code</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard