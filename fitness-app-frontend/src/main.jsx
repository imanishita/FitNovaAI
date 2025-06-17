import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './firebase'; // just to make sure it's initialized

AOS.init();
console.log("👀 React App is rendering...");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
