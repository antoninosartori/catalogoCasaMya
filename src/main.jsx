import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StateContextApp from './context/StateContextApp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateContextApp>
      <App />
    </StateContextApp>
  </React.StrictMode>,
)
