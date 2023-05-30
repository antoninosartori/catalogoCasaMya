import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StateContextApp from './context/StateContextApp.jsx'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <StateContextApp>
        <App />
      </StateContextApp>
    </HashRouter>
  </React.StrictMode>,
)
