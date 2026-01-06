import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/appRoutes.jsx'
import Navbar from './components/Navbar.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <AppRoutes />
    </>
  )
}

export default App
