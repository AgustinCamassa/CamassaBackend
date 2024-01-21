import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Products } from './components/Products'
import { NewProducts } from './components/NewProducts'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<Products />} />
          <Route path='/new-product' element={<NewProducts />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
