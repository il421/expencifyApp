import moment from 'moment';
//Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createAt);
    
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true; // filter startDate
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;; // filter End date
    const textMatch = typeof text == 'string' && expense.description.toLowerCase().includes(text.toLowerCase()); // search by text

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
      if ( sortBy == 'date') { // sort by date
        return a.createAt < b.createAt ? 1 : -1;
      } else if ( sortBy == 'amount' ) { // sort by amount
          return a.amount < b.amount ? 1 : -1;
      }
  })
};

export default getVisibleExpenses;