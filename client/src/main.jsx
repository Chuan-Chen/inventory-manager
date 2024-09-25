import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './App.jsx';
import './styles/index.css';
import {Provider} from 'react-redux';
import authStore from './features/authSlice.js';
import api from './features/api.js';

ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store = {authStore}>
      <BrowserRouter basename={api.BASE}>
        <App />
      </BrowserRouter>
    </Provider>
  
)
