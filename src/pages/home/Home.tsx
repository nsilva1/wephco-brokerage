import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Home = () => {
  const { currentUser } = useAuth()

  return (
    <div>
      <div>
        <p className='font-bold text-2xl'>Hello, {currentUser?.displayName}</p>
      </div>

      {/* Profile section */}
    </div>
  )
}

export { Home }