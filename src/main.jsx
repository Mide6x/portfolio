import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import { getInitialData } from './utils/initialData'

const rootElement = document.getElementById('root')
const initialData = getInitialData()

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
)

if (initialData) {
  rootElement.innerHTML = ''
}

ReactDOM.createRoot(rootElement).render(app)
