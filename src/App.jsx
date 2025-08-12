import React from 'react'
import DynamicChart from './components/DynamicChart'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './components/About'

const App = () => {
  return (
    <div className='flex items-center justify-center w-[100vw] mt-10'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<DynamicChart/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App