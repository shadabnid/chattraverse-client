import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async'
import {Provider} from "react-redux";
import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  

  
    <HelmetProvider>
      <CssBaseline />
      {/* <div onContextMenu={(e) => { e.preventDefault() }}> */}
       <Provider store={store}>

        <App />
       </Provider>
      {/* </div> */}
    </HelmetProvider>

    
 ,
)
