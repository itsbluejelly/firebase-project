// IMPORTING NECESSARY FILES
  // IMPORTING MODULES
import React from 'react'
import ReactDOM from 'react-dom/client'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from 'firebase/database'
    // IMPORTING CONFIGS
import firebaseConfig from "./firebaseConfig";
  // IMPORTING COMPONENTS
import App from './App.jsx'
  // IMPORTING STYLESHEETS
import './css/index.css'

// GET THE APPS AND CREATE AN INSTANCE
const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
getAnalytics(app)

// EXPORTING AN APP THAT RENDERS THE REACT UI
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
