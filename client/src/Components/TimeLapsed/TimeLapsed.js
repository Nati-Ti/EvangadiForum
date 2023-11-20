import React from 'react'
import './TimeLapsed.css';
import moment from 'moment/moment';


function TimeLapsed({createdAt}) {

  const currentTime = moment();
  const questionCreatedAt = moment(createdAt);
  const timeDiff = moment.duration(currentTime.diff(questionCreatedAt));

  let timeLapsed;
  if (timeDiff.asMinutes() < 60) {
    timeLapsed = `${timeDiff.asMinutes().toFixed(0)} minutes ago`;
  } else if (timeDiff.asHours() < 24) {
    timeLapsed = `${timeDiff.asHours().toFixed(0)} hours ago`;
  } else if (timeDiff.asDays() < 7) {
    timeLapsed = `${timeDiff.asDays().toFixed(0)} days ago`;
  } else if (timeDiff.asWeeks() < 4) {
    timeLapsed = `${timeDiff.asWeeks().toFixed(0)} weeks ago`;
  } else if (timeDiff.asMonths() < 12) {
    timeLapsed = `${timeDiff.asMonths().toFixed(0)} months ago`;
  } else {
    timeLapsed = `${timeDiff.asYears().toFixed(0)} years ago`;
  }

  return (
    <div className='timeLapsed'>{timeLapsed}</div>
  )
}

export default TimeLapsed