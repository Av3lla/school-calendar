import { useState } from 'react';
import './App.css';
import Launch from './Launch.js';
import TimeTable from './TimeTable.js';

function App() {
  const [page, setPage] = useState('launch');
  const [school, setSchool] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('ko').replace(/. /g, '-').slice(0, 10));
  const [schoolInfo, setSchoolInfo] = useState('');
  const [isSchoolInfoReady, setIsSchoolInfoReady] = useState(false);
  const [schoolName, setSchoolName] = useState('');

  let mainField;

  function getSchoolInfo(url, key, type, pIndex, pSize, schoolName) {
    const requestUrl = `${url}?Key=${key}&Type=${type}&pIndex=${pIndex}&pSize=${pSize}&SCHUL_NM=${schoolName}`;
    fetch(requestUrl)
      .then(rawResponse => {
        return rawResponse.json();
      })
      .then(async responseJson => {
        setSchoolInfo(responseJson);
      })
      .catch(error => {
        setSchoolInfo(error);
      });

    return schoolInfo;
  }
  
  if (page === 'launch') {
    mainField = <Launch
      school={school}
      setSchool={setSchool}
      date={date}
      setDate={setDate}
      schoolInfo={schoolInfo}
      isSchoolInfoReady={isSchoolInfoReady}
      setIsSchoolInfoReady={setIsSchoolInfoReady}
      schoolName={schoolName}
      setSchoolName={setSchoolName}
      getSchoolInfo={getSchoolInfo}
    />;
  } else if (page === 'timetable') {
    mainField = <TimeTable
      school={school}
      setSchool={setSchool}
      date={date}
      setDate={setDate}
      schoolInfo={schoolInfo}
      isSchoolInfoReady={isSchoolInfoReady}
      setIsSchoolInfoReady={setIsSchoolInfoReady}
      schoolName={schoolName}
      setSchoolName={setSchoolName}
      getSchoolInfo={getSchoolInfo}
    />;
  }
 
  return (
    <div className="App">
      <h1>학교 캘린더</h1>
      <div className='selectField'>
        <button onClick={() => {setPage('launch')}} className='selectItem'>급식</button>
        <button onClick={() => {setPage('timetable')}} className='selectItem'>시간표</button>
      </div>
      {mainField}
    </div>
  );
}

export default App;