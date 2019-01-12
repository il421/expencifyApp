import React from 'react';
import numeral from 'numeral';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ id, description, amount, createAt }) => (
  <div>
    <Link to={ `edit/${ id }` }><h3>{ description }</h3></Link>
    <p>Amount: { numeral( amount / 100 ).format('$0,0.00') } - { moment(createAt).format('MMMM Do, YYYY') } days ago.</p>
  </div>
);

export default ExpenseListItem;