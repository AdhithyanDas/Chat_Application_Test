import './App.css'
import './bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/home' element={<Home />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
