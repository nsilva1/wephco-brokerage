import { AuthForm } from '../../components/AuthForm'

const Login = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center font-outfit overflow-y-scroll'>
      <AuthForm login={true} />
    </div>
  )
}

export { Login }