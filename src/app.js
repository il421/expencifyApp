import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';

import configStore from './store/configStore';

import 'normalize.css/normalize.css'
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configStore();

const jsx = ( // Provider - Now we can use store everywhere
  <Provider store={ store }> 
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));