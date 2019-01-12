import React from 'react';
import getVisibleExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';
import { connect } from 'react-redux';

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
  const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
  const formatedTotal = numeral( expensesTotal / 100 ).format('$0,0.00')

  return (
    <div>
      {
        expensesCount === 0 ? ( <p></p> ) :
        (
          <h1>
            Viewing { expensesCount } { expenseWord } totaling { formatedTotal }.
          </h1>
        )
      }

    </div>
  )
};

const mapStateToProps = (state) => { 
  const visableExpenses = getVisibleExpenses(state.expenses, state.filters);

  return {
    expensesCount: visableExpenses.length,
    expensesTotal: selectExpensesTotal(visableExpenses)
  }
}

export default connect(mapStateToProps)(ExpensesSummary);
