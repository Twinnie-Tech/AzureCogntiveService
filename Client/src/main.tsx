import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import  dotenv from "dotenv";

// dotenv.config({path:"./.env"});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>  
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
