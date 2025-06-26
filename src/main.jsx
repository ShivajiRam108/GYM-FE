import { StrictMode } from 'react'

import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
     <CookiesProvider>
      <App />
     </CookiesProvider>
    </BrowserRouter>
  // </StrictMode>,
)
