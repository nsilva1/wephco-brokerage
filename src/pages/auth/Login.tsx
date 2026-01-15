import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { AuthForm } from '../../components/AuthForm'

const Login = () => {
  const { currentUser, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && currentUser) {
      navigate('/home', { replace: true })
    }
  }, [currentUser, loading, navigate])

  return (
    <div className='h-screen flex flex-col items-center justify-center font-outfit overflow-y-scroll'>
      <AuthForm login={true} />
    </div>
  )
}

export { Login }