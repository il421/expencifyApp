import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import LoginPage from '../components/LoginPage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import HelpExpensePage from '../components/HelpExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';

//can access history everythere
export const history = createHistory();

const AppRouter = () => (
  <Router history={ history }>
    <div>
      <Switch>
        <Route path="/" component={ LoginPage } exact={ true } />>
        <PrivateRoute path="/dashboard" component={ ExpenseDashboardPage } />
        <PrivateRoute path="/create" component={ AddExpensePage } />
        <PrivateRoute path="/edit/:id" component={ EditExpensePage } />
        <Route path="/help" component={ HelpExpensePage } />
        <Route component={ NotFoundPage } />
      </Switch>
    </div>
  </Router>
);
// path, component, exact (tell router not to match paths if true)
// :id save a paramentr in match/params

export default AppRouter;