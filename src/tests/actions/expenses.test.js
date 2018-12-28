import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

// TEST REMOVE EXPENSE
test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });

  expect(action).toEqual({ // for {} and []
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});


// TEST EDIT EXPENSE
test('should setup edit expense action object', () => {
  const action = editExpense('123abc', {description: 'rent', amount: 100, note:'my bills', createAt:1000});

  expect(action).toEqual({ // for {} and []
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      description: 'rent',
      note: 'my bills',
      amount: 100,
      createAt: 1000
    }
  });
});

// TEST ADD EXPENSE
test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'Rent',
    amount: 100,
    createAt: 4000,
    note: 'This was the last month rent'
  };
  const action = addExpense(expenseData);

  expect(action).toEqual({ // for {} and []
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

// TEST ADD DEFAULT EXPENSE
test('should setup add expense action object by default', () => {
  const action = addExpense();

  expect(action).toEqual({ // for {} and []
    type: 'ADD_EXPENSE',
    expense: {
      description: '', 
      note: '', 
      amount: 0, 
      createAt: 0,
      id: expect.any(String)
    }
  });
});