import expenses from '../fixtures/expenses';
import expensesReducer from '../../reducers/expenses';

test('should set default expense', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual([]);
});

test('should remove expence by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual([ expenses[0], expenses[2] ]);
});

test('should not remove expence if id is not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '5'
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});


test('should add an expense', () => {
  const newExpense = {
    id: '4',
    description: 'Food',
    note: '',
    amount: 1905,
    createAt: 0
  };

  const action = {
    type: 'ADD_EXPENSE',
    expense: newExpense
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, newExpense]);
});

test('should edit an expense', () => {
  const description = 'Tany';

  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: { description }
  };
  const state = expensesReducer(expenses, action);

  expect(state[1].description).toBe(description);
});

test('should not edit an expense', () => {
  const description = 'Tany';

  const action = {
    type: 'EDIT_EXPENSE',
    id: '5',
    updates: { description }
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});
