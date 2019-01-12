import expenses from '../fixtures/expenses';
import selectExpensesTotal from '../../selectors/expenses-total';

test('should return 0 if no expense', () => {
  const res = selectExpensesTotal([]);
  expect(res).toBe(0);
});

test('should correctely add up a single expense', () => {
  const res = selectExpensesTotal([expenses[0]]);
  expect(res).toBe(100);
});

test('should correctely add up a miltiple expense', () => {
  const res = selectExpensesTotal(expenses);
  expect(res).toBe(600);
});