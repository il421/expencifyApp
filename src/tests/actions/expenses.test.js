import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
  startAddExpense ,
  addExpense, 
  editExpense, 
  removeExpense, 
  setExpenses, 
  startSetExpenses, 
  startRemoveExpense,
  startEditExpense 
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = {auth: { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createAt }) => {
    expensesData[id] = { description, note, amount, createAt };
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
})

// TEST REMOVE EXPENSE
test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });

  expect(action).toEqual({ // for {} and []
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});


test('should remove expense form DB', (done) => {
  const store = createMockStore(defaultAuthState);

  const id = expenses[1].id;

   store.dispatch(startRemoveExpense({ id })).then(() => {
     const actions = store.getActions();
     expect(actions[0]).toEqual({
       type: 'REMOVE_EXPENSE',
       id
     });

    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});


// TEST EDIT EXPENSE
test('should setup edit expense action object', () => {
  const action = editExpense('123abc', {description: 'rent', amount: 100, note:'my bills', createdAt:1000});

  expect(action).toEqual({ // for {} and []
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      description: 'rent',
      note: 'my bills',
      amount: 100,
      createdAt: 1000
    }
  });
});

test('should edit expense from DB', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[1].id;
  const updates = {
   amount: 300
  };

   store.dispatch(startEditExpense(id, updates)).then(() => {
     const actions = store.getActions();
     expect(actions[0]).toEqual({
       type: 'EDIT_EXPENSE',
       id,
       updates
     });

    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().amount).toBe(updates.amount);
    done();
  });
});

// TEST ADD EXPENSE
test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);

  expect(action).toEqual({ // for {} and []
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense to DB and store', (done) => {
   const store = createMockStore(defaultAuthState);
   const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'Ilya',
    createAt: 1000
   };

   store.dispatch(startAddExpense(expenseData)).then(() => {
     const actions = store.getActions();
     expect(actions[0]).toEqual({
       type: 'ADD_EXPENSE',
       expense: {
         id: expect.any(String),
         ...expenseData
       }
     });

     return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test('should add expense with default to DB and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseDefault = {
   description: '',
   amount: 0,
   note: '',
   createAt: 0
  };

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefault
      }
    });

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefault);
    done();
  });
});

// TEST SET AND FATCH EXPENSE
test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fatch the expenses from DB', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  })
});
