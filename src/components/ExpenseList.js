import React from 'react';
import ExpenseListItem from './ExpenseListItem';
import getVisibleExpenses from '../selectors/expenses';
import { connect } from 'react-redux';

export const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {
        props.expenses.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No expenses</span>
          </div>
        ) : (
          props.expenses.map((expense) => (
            <ExpenseListItem 
              key={ expense.id }
              { ...expense } // contain all elements
            />
          ))
        )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => { // mapStateToProps
  return {
    expenses: getVisibleExpenses(state.expenses, state.filters)
  };
}

export default connect(mapStateToProps)(ExpenseList); // connect to redux state