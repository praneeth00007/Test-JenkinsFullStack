import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainNavBar from './MainNavBar'
import './App.css'

// Get the base path from the Vite config or environment
const basePath = import.meta.env.BASE_URL || '/itemsapi/';

export default function App() {
  return (
    <div className="app">
      <BrowserRouter basename={basePath}>
        <MainNavBar />
      </BrowserRouter>
    </div>
  )
}
