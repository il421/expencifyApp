import React from 'react';
import { Link } from 'react-router-dom';
import getVisibleExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';
import { connect } from 'react-redux';

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
  const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
  const formatedTotal = numeral( expensesTotal / 100 ).format('$0,0.00')

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{ expensesCount }</span> { expenseWord } totaling <span>{ formatedTotal }</span>.
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add expense</Link>
        </div>
      </div>
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
