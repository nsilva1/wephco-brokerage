import React from 'react'
import { ProtectedRoute } from '../auth/ProtectedRoute'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <ProtectedRoute>
        <div className="min-h-screen flex flex-col">
            <main className="grow">
                {children}
            </main>
        </div>
    </ProtectedRoute>
  )
}

export { Layout }