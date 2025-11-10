import React, { useContext } from 'react'
import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import { UserContext } from './context/UserContext'

const App = () => {

  const {token} = useContext(UserContext)


  return (
    <div className=''>
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={token?  <HomePage /> :<LoginPage/>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/setting' element={<SettingPage />} />
          <Route path='/profile' element={token && token.length > 0 ? <ProfilePage /> : <LoginPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App