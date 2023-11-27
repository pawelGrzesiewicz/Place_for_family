import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../scss/main.scss'
import {FamilyDataProvider} from "./hooks/FamilyDataContext.jsx";



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <FamilyDataProvider>
            <App />
        </FamilyDataProvider>
    </React.StrictMode>,
)
