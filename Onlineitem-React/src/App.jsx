import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainNavBar from './MainNavBar'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <MainNavBar />
      </BrowserRouter>
    </div>
  )
}
