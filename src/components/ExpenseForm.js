import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      note: props.expense ? props.expense.note : '',
      createAt: props.expense ? moment(props.expense.createAt) : moment(),
      calendarFocused: false,
      error: ''
    }
  };

  onDescriptionChange = (evt) => {
    const description = evt.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = (evt) => {
    const note = evt.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = (evt) => {
    const amount = evt.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (createAt) => {
    if (createAt) {
      this.setState(() => ({ createAt }));
    }
    
  };

  onFocusChange = ({ focused }) => { // from the docs
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide description and amount!' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createAt: this.state.createAt.valueOf(),
        note: this.state.note
      })
    }
  };

  render() {
    return (
      <div>
        { this.state.error && <p>{this.state.error}</p> }
        <form onSubmit={ this.onSubmit }>
          <input
            type="text"
            placeholder="Description"
            autoFocus 
            value={ this.state.description }       
            onChange={ this.onDescriptionChange }  
          />
          <input
            type="text"
            placeholder="Amount"
            value={ this.state.amount }       
            onChange={ this.onAmountChange } 
          />
          <SingleDatePicker 
            date={ this.state.createAt }
            onDateChange={ this.onDateChange }
            focused={ this.state.calendarFocused }
            onFocusChange={ this.onFocusChange }
            numberOfMonths={ 1 }
            isOutsideRange={ () => false } // any day is available, past and future
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={ this.state.note }
            onChange={ this.onNoteChange }
          >
          </textarea>
          <button>Add expense</button>
        </form>
      </div>
    )
  }
}