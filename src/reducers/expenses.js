// Expenses Reducer
const expensesReduserDefaultState = [];

const expensesReducer = (state = expensesReduserDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense] //it is spread operator works like - > state.concat(action.expense);
    
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id == action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      });

    case 'SET_EXPENSES':
      return action.expenses

    default:
      return state;
  }
};

export default expensesReducer;