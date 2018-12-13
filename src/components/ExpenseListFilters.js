import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };

  render() {
    return (
      <div>
      <input 
        type="text" 
        value={ this.props.filters.text } 
        onChange={
          (evt) => { // filter
            this.props.dispatch(setTextFilter(evt.target.value)); // pass value to filter text
          }
      }/>
      <br />
      <select 
        value={ this.props.filters.sortBy } 
        onChange={ // sort by
          (evt) => {
            switch (evt.target.value) {
              case 'date':
              this.props.dispatch(sortByDate());
                break;
              case 'amount':
              this.props.dispatch(sortByAmount());   
                break;         
            }
          }
        }
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

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseListFilters);