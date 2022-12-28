import { useEffect, useState } from "react";
import TimeTableResult from './TimeTableResult';
import './TimeTable.css';

function TimeTable(props) {
  const key = "43a33fcd83024a808b31281147f91482";
  const searchSchoolUrl = "https://open.neis.go.kr/hub/schoolInfo";
  const timeTableUrl = "https://open.neis.go.kr/hub/hisTimetable";
  const scheduleUrl = "https://open.neis.go.kr/hub/SchoolSchedule";

  const school = props.school;
  const setSchool = props.setSchool;
  const date = props.date;
  const setDate = props.setDate;
  const schoolInfo = props.schoolInfo;
  const schoolName = props.schoolName;
  const setSchoolName = props.setSchoolName;
  const isSchoolInfoReady = props.isSchoolInfoReady;
  const setIsSchoolInfoReady = props.setIsSchoolInfoReady;

  const [timeTableInfo, setTimeTableInfo] = useState('');
  const [timeTable, setTimeTable] = useState('');
  const [scheduleInfo, setScheduleInfo] = useState('');
  const [schedule, setSchedule] = useState('');
  const [grade, setGrade] = useState('');
  const [classNum, setClassNum] = useState('');

  const getSchoolInfo = props.getSchoolInfo;

  function getTimeTable(url, key, type, pIndex, pSize, eduCode, schoolCode, date, grade, classNum) {
    const requestUrl = `${url}?Key=${key}&Type=${type}&pIndex=${pIndex}&pSize=${pSize}&ATPT_OFCDC_SC_CODE=${eduCode}&SD_SCHUL_CODE=${schoolCode}&ALL_TI_YMD=${date}&GRADE=${grade}&CLASS_NM=${classNum}`;
    fetch(requestUrl)
      .then(rawResponse => {
        return rawResponse.json();
      })
      .then(responseJson => {
        setTimeTableInfo(responseJson);
      })
      .catch(error => {
        setTimeTableInfo(error);
      })

    return timeTableInfo;
  }

  function getSchedule(url, key, type, pIndex, pSize, eduCode, schoolCode, date) {
    const requestUrl = `${url}?Key=${key}&Type=${type}&pIndex=${pIndex}&pSize=${pSize}&ATPT_OFCDC_SC_CODE=${eduCode}&SD_SCHUL_CODE=${schoolCode}&AA_YMD=${date}`;
    fetch(requestUrl)
      .then(rawResponse => {
        return rawResponse.json();
      })
      .then(responseJson => {
        setScheduleInfo(responseJson);
      })
      .catch(error => {
        setScheduleInfo(error);
      })

    return scheduleInfo;
  }

  const changeInput = (e) => {
    if (e.target.id === 'schoolInput') {
      setSchool(e.target.value);
    } else if (e.target.id === 'gradeInput') {
      setGrade(e.target.value);
    } else if (e.target.id === 'classInput') {
      setClassNum(e.target.value);
    } else if (e.target.id === 'dateInput') {
      setDate(e.target.value);
    }
  }

  const loadSchoolInfo = () => {
    getSchoolInfo(searchSchoolUrl, key, 'json', 1, 100, school);
  }

  const loadTimeTable = (eduCode, schoolCode) => {
    const formattedDate = date.replace(/-/g, '').slice(1, 8);
    getTimeTable(timeTableUrl, key, 'json', 1, 100, eduCode, schoolCode, formattedDate, grade, classNum);
  }

  const loadSchedule = (eduCode, schoolCode) => {
    const formattedDate = date.replace(/-/g, '').slice(1, 8);
    getSchedule(scheduleUrl, key, 'json', 1, 100, eduCode, schoolCode, formattedDate);
  }

  useEffect(() => {
    if (schoolInfo !== '' && !isSchoolInfoReady) {
      let result = schoolInfo.schoolInfo[1].row[0];
      const eduCode = result.ATPT_OFCDC_SC_CODE;
      const eduName = result.ATPT_OFCDC_SC_NM;
      const schoolCode = result.SD_SCHUL_CODE;
      const schoolName = result.SCHUL_NM;
      console.log(result.SCHUL_NM);
      loadTimeTable(eduCode, schoolCode);
      loadSchedule(eduCode, schoolCode);
      setIsSchoolInfoReady(!isSchoolInfoReady);
      setSchoolName(schoolName);
    }
  }, [schoolInfo, isSchoolInfoReady, schoolName])

  useEffect(() => {
    if (timeTableInfo !== '') {
      let result = timeTableInfo.hisTimetable[1].row;
      let timeTableArray = [];
      for (let i = 0; i < result.length; i++) {
        timeTableArray.push(result[i].ITRT_CNTNT);
      }
      setTimeTable(timeTableArray);
    }
  }, [timeTableInfo])

  useEffect(() => {
    if (scheduleInfo !== '') {
      let result = scheduleInfo.SchoolSchedule[1].row;
      let scheduleArray = [];
      for (let i = 0; i < result.length; i++) {
        scheduleArray.push(result[i].EVENT_NM);
      }
      setSchedule(scheduleArray);
    }
  }, [scheduleInfo])


  return (
    <div className='TimeTable'>
      <div className='TTInputField'>
        <label htmlFor='schoolInput' className='TTInputItem'>학교명</label>
        <input id='schoolInput' type='text' placeholder='학교 이름을 입력' value={school} onChange={changeInput} className='TTInputItem'></input>
        <label htmlFor='gradeInput' className='TTInputItem'>학년</label>
        <input id='gradeInput' type='text' placeholder="학년" value={grade} onChange={changeInput} className='TTInputItem'></input>
        <label htmlFor='classInput' className='TTInputItem'>반</label>
        <input id='classInput' type='text' placeholder="반" value={classNum} onChange={changeInput} className='TTInputItem'></input>
        <label htmlFor='dateInput' className='TTInputItem'>날짜</label>
        <input id='dateInput' type="date" min="2000-01-01" max="2099-12-31" value={date} onChange={changeInput} className='TTInputItem'></input>
        <button onClick={loadSchoolInfo} className='TTInputItem'>확인</button>
      </div>
      <TimeTableResult
        date={date}
        schoolName={schoolName}
        grade={grade}
        classNum={classNum}
        timeTable={timeTable}
        schedule={schedule}
      />
    </div>
  )
}

export default TimeTable;