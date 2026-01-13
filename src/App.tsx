import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"

import { Layout } from "./layout/Layout"

import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import { Home } from "./pages/home/Home"

function App() {

  return (
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
