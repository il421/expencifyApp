import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = (props) => {
  return (
    <div>
      <ExpenseForm
      expense={ props.expense }
        onSubmit={(expense) => {
          props.dispatch(editExpense(props.expense.id ,expense));
          props.history.push('/'); // go to the home page it is from props onject
          }
        }
      />
      <button onClick={
        () => {
          props.dispatch(removeExpense({ id: props.expense.id }));
          props.history.push('/'); // go to the home page it is from props onject
        }
      }>
        Remove
    </button>
    </div>
  )
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) =>  expense.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(EditExpensePage);