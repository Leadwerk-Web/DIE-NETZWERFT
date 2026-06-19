import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')

// #region agent log
fetch('http://127.0.0.1:7366/ingest/b36f4b69-b3b7-4b0b-b332-d41c2c52d7db',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8d4886'},body:JSON.stringify({sessionId:'8d4886',runId:'pre-fix',hypothesisId:'A',location:'main.tsx:mount',message:'App bootstrap',data:{hasRoot:!!rootElement,baseUrl:import.meta.env.BASE_URL,pathname:window.location.pathname},timestamp:Date.now()})}).catch(()=>{});
// #endregion

if (!rootElement) {
  throw new Error('Root element #root not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
