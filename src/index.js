import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './Redux/Store';
import reportWebVitals from './reportWebVitals';
import {HashRouter as Router } from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
     <Router>
     <App />
     </Router>
     </Provider>
  </React.StrictMode>
);

reportWebVitals();
