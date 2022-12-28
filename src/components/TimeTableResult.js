import React from "react";

function TimeTableResult(props) {
  let resultDiv;

  if (props.timeTable !== '' && props.schedule !== '') {
    let formattedTimeTable = props.timeTable.join('\n');
    let formattedSchedule = props.schedule.join('\n');
    resultDiv = <div className="resultField">
      <div className="resultTitle">
        {props.schoolName}<br />{props.grade}학년 {props.classNum}반<br />{props.date}
      </div>
      <div className="resultValue">
        <p>시간표</p>
        {formattedTimeTable}<br />
        <p>학사일정</p>
        {formattedSchedule}
      </div>
    </div>;
  }

  return(
    resultDiv
  )
}

export default TimeTableResult;