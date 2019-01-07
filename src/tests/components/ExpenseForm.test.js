import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm correctly with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={ expenses[1] } />);
  expect(wrapper).toMatchSnapshot();
});

test ('should render error for invalid input submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', { // simulate an user action 
    preventDefault: () => { } // here we simulate preventDefault, by empty function as a second arg
   });
   expect(wrapper.state('error').length).toBeGreaterThan(0);
   expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const value = 'New description';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', { // at() - select input by index
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'New note';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', { // at() - select input by index
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
  const value = '12.50';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', { // at() - select input by index
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should set amount if invalid input', () => {
  const value = '12.500';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', { // at() - select input by index
    target: { value }
  });
  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={ expenses[0] } onSubmit={ onSubmitSpy }/>);
  
  wrapper.find('form').simulate('submit', { // simulate an user action 
    preventDefault: () => { } // here we simulate preventDefault, by empty function as a second arg
   });

  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createAt: expenses[0].createAt
  }); // check whether a function was called or not
});

test('should set a new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find('SingleDatePicker').prop('onDateChange')(now); // check prop
  expect(wrapper.state('createAt')).toEqual(now);
});

test('should set a calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused }); // check prop
  expect(wrapper.state('calendarFocused')).toBe(focused);
});