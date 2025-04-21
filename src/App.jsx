import { Routes, Route } from 'react-router-dom'
import './App.css'

import Login from './components/Login.jsx'
import NewUserRegistration from './components/NewUserRegistration.jsx'
import CustomerModeInfo from './components/CustomerModeInfo.jsx'
import AdminModeInfo from './components/AdminModeInfo.jsx'
import Categories from './components/Categories.jsx'
import Products from './components/Products.jsx'
import Customers from './components/Customers.jsx'
import Statistics from './components/Statistics.jsx'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/addnewuser' element={<NewUserRegistration />} />

        <Route path='/customermodeinfo' element={<CustomerModeInfo />} >
        </Route>

        <Route path='/adminmodeinfo' element={<AdminModeInfo />} >
          <Route path='categories' element={<Categories />} />
          <Route path='products' element={<Products />} />
          <Route path='customers' element={<Customers />} />
          <Route path='statistics' element={<Statistics />} />
        </Route>

      </Routes>


    </>
  )
}

export default App
