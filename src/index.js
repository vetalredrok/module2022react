import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";


import App from './App';
import {setupStore} from "./redux";
import './index.css';
import './configs/firebase/firebase';
import {DarkModeProvider} from "./context";

const store = setupStore();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


      <BrowserRouter>
          <Provider store={store}>
              <DarkModeProvider>
              <App />
              </DarkModeProvider>
          </Provider>
      </BrowserRouter>

);
