import React from 'react';
import ExpenseListItem from './ExpenseListItem';
import getVisibleExpenses from '../selectors/expenses';
import { connect } from 'react-redux';

export const ExpenseList = (props) => (
  <div>
    <h1>ExpenseList</h1>
    {
      props.expenses.length === 0 ? (
        <p>No expenses</p>
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
);

const mapStateToProps = (state) => { // mapStateToProps
  return {
    expenses: getVisibleExpenses(state.expenses, state.filters)
  };
}

export default connect(mapStateToProps)(ExpenseList); // connect to redux state