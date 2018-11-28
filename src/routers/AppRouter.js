import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import HelpExpensePage from '../components/HelpExpensePage';
import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header /><br/>
      <Switch>
        <Route path="/" component={ ExpenseDashboardPage } exact={ true } />
        <Route path="/create" component={ AddExpensePage } />
        <Route path="/edit/:id" component={ EditExpensePage } />
        <Route path="/help" component={ HelpExpensePage } />
        <Route component={ NotFoundPage } />
      </Switch>
    </div>
  </BrowserRouter>
);
// path, component, exact (tell router not to match paths if true)
// :id save a paramentr in match/params

export default AppRouter;