import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import { startSetExpenses } from './actions/expenses';
import configStore from './store/configStore';

import 'normalize.css/normalize.css'
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';


const store = configStore();

const jsx = ( // Provider - Now we can use store everywhere
  <Provider store={ store }> 
    <AppRouter />
  </Provider>
);

ReactDOM.render(<p>Loading ...</p>, document.getElementById('app'));

// set data than render
store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('app'));
});
