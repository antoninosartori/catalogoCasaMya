import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StateContextApp from './context/StateContextApp.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StateContextApp>
        <App />
      </StateContextApp>
    </BrowserRouter>
  </React.StrictMode>,
)
