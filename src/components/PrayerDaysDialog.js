import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

class PrayerDaysDialog extends Component {
  onChange = (date) => {
    const {edition, month, history} = this.props
    history.push(`/editions/${edition.id}/${month}/${date.getDate()}`)
  };
  calculateMinAndMaxDate() {
    //only allow user to select days that already has prayer added
    // and a day after
    const { month, edition, daysInMonth } = this.props;
    let currentMonth =
      month === 0
        ? edition.monthOne
        : month === 1
        ? edition.monthTwo
        : edition.monthThree;
    // if (month === 0) currentMonth = edition.monthOne;
    // if (month === 1) currentMonth = edition.monthTwo;
    // if (month === 2) currentMonth = edition.monthThree;

    let minDate = 1;
    let maxDate = 1;
    for (var a = 0; a < currentMonth.length; a++) {
      if (currentMonth[a] !== null) {
        maxDate = a + 1;
      }
    }
    // ensure the maxDate is between the range of the number of days the month has
    if (maxDate > daysInMonth) maxDate = daysInMonth;
    return {
      minDate: new Date(
        edition.year,
        edition.startingMonth + (month - 1), //months index start at 0
        minDate
      ),
      maxDate: new Date(
        edition.year,
        edition.startingMonth + (month - 1), //months index start at 0
        maxDate
      ),
    };
  }
  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.calculateMinAndMaxDate().maxDate}
          minDate={this.calculateMinAndMaxDate().minDate}
          maxDate={this.calculateMinAndMaxDate().maxDate}
          showNeighboringMonth={false}
          showNavigation={false}
        />
      </div>
    );
  }
}

export default withRouter(PrayerDaysDialog);
