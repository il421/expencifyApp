import moment from 'moment';
import { setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount } from '../../actions/filters';

// SET_START_DATE
test('should generate set start date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  })
});

// SET_END_DATE
test('should generate set end date action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  })
});

// SET_TEXT_FILTER
test('should generate set text for filter action object', () => {
  const action = setTextFilter('Ilya');
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'Ilya'
  })
});

// SET_TEXT_FILTER_DEFAULT
test('should generate set default text for filter action object', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  })
});

// SORT_BY_DATE
test('should generate set sorted by date action object', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SORT_BY_DATE',
    sortBy: 'date'
  })
});

// SORT_BY_AMOUNT
test('should generate set sorted by amount action object', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT',
    sortBy: 'amount'
  })
});