import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { LocationStorage } from './context/LocationContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocationStorage>
      <App />
    </LocationStorage>
  </React.StrictMode>,
)
