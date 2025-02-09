import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider'
import './index.css'
// import App from './App'
import router from './router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  </StrictMode>,
)
