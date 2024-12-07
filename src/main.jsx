import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import 'font-awesome/css/font-awesome.min.css'; //Spotify font import
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
