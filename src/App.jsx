import { Routes, Route } from 'react-router-dom'
import './App.css'

import Login from './components/Login.jsx'
import NewUserRegistration from './components/NewUserRegistration.jsx'
import CustomerInfo from './components/CustomerInfo.jsx'


function App() {
  return (
    <>
      <Routes>
        {/* <Login /> */}
        <Route path='/' element={<Login />} />
        <Route path='/addnewuser' element={<NewUserRegistration />} />
        <Route path='/customerinfo' element={<CustomerInfo />} />
      </Routes>
    </>
  )
}

export default App
