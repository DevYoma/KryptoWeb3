import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TransactionProvider } from './context/TransactionContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionProvider value={{ value: 'text' }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TransactionProvider>  
)
