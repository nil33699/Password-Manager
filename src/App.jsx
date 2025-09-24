import { useState } from 'react'
import Navbar from './components/navbar'
import Manager from './components/manager'
import Footer from './components/footer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Manager />
      <Footer/>
    </>
  )
}

export default App
