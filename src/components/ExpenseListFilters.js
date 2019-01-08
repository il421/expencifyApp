import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };

  onTextChange = (evt) => { // filter
    this.props.setTextFilter(evt.target.value); // pass value to filter text
  };

  onSortChange = (evt) => { // sort By
    switch (evt.target.value) {
      case 'date':
      this.props.sortByDate();
        break;
      case 'amount':
      this.props.sortByAmount();   
        break;         
    }
  };

  render() {
    return (
      <div>
      <input 
        type="text" 
        value={ this.props.filters.text } 
        onChange={ this.onTextChange }
      />
      <br />
      <select 
        value={ this.props.filters.sortBy } 
        onChange={ this.onSortChange }
      >
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </select>
      <br />
      <DateRangePicker 
        startDate={ this.props.filters.startDate }
        endDate={ this.props.filters.endDate }
        onDatesChange={ this.onDatesChange }
        focusedInput={ this.state.calendarFocused }
        onFocusChange={ this.onFocusChange }
        showClearDates={ true }
        numberOfMonths={ 1 }
        isOutsideRange={ () => false } // any day is available, past and future
      />
    </div>
    )
  }

  };

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

const mapStateToProps = (state) => ({
    filters: state.filters
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);