import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';

import configStore from './store/configStore';
import getVisibleExpenses from './selectors/expenses';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';

import 'normalize.css/normalize.css'
import './styles/styles.scss';

const store = configStore();

store.dispatch(addExpense({ description: 'Water bill', amount: 200, createAt: 300 }));
store.dispatch(addExpense({ description: 'Gas bill', amount: 100, createAt: 500 }));
store.dispatch(addExpense({ description: 'Rent bill', amount: 500, createAt: 100 }));


const jsx = ( // Provider - Now we can use store everywhere
  <Provider store={ store }> 
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));