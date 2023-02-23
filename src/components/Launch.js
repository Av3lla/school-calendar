import React, { useState, useEffect } from 'react';
import LaunchResult from './LaunchResult';
import './Launch.css';

function Launch(props) {
  const key = "43a33fcd83024a808b31281147f91482";
  const searchSchoolUrl = "https://open.neis.go.kr/hub/schoolInfo";
  const launchUrl = "https://open.neis.go.kr/hub/mealServiceDietInfo";

  const school = props.school;
  const setSchool = props.setSchool;
  const date = props.date;
  const setDate = props.setDate;
  const schoolInfo = props.schoolInfo;
  const isSchoolInfoReady = props.isSchoolInfoReady;
  const setIsSchoolInfoReady = props.setIsSchoolInfoReady;
  const schoolName = props.schoolName;
  const setSchoolName = props.setSchoolName;
  const [launchInfo, setLaunchInfo] = useState('');
  const [launchMenu, setLaunchMenu] = useState('');

  const getSchoolInfo = props.getSchoolInfo;
  

  function getLaunch(url, key, type, pIndex, pSize, eduCode, schoolCode, date) {
    const requestUrl = `${url}?Key=${key}&Type=${type}&pIndex=${pIndex}&pSize=${pSize}&ATPT_OFCDC_SC_CODE=${eduCode}&SD_SCHUL_CODE=${schoolCode}&MLSV_YMD=${date}`;

    fetch(requestUrl)
      .then(rawResponse => {
        return rawResponse.json();
      })
      .then(responseJson => {
        setLaunchInfo(responseJson);
      })
      .catch(error => {
        setLaunchInfo(error);
      })

    return launchInfo;
  }
/*   console.log(getLaunch(launchUrl, key, "json", 1, 100, "T10", 9290083, 221219)); */

  const changeInput = (e) => {
    if (e.target.id === "schoolInput") {
      setSchool(e.target.value);
    } else if (e.target.id === "dateInput") {
      setDate(e.target.value);
    }
  }

  const loadSchoolInfo = () => {
    getSchoolInfo(searchSchoolUrl, key, 'json', 1, 100, school);
  }

  const loadLaunch = (eduCode, schoolCode) => {
    const formattedDate = date.replace(/-/g, '').slice(1, 8);
    getLaunch(launchUrl, key, 'json', 1, 100, eduCode, schoolCode, formattedDate);
  }

  useEffect(() => {
    if (schoolInfo !== '' && !isSchoolInfoReady) {
      let result = schoolInfo.schoolInfo[1].row[0];
      const eduCode = result.ATPT_OFCDC_SC_CODE;
      const eduName = result.ATPT_OFCDC_SC_NM;
      const schoolCode = result.SD_SCHUL_CODE;
      const schoolName = result.SCHUL_NM;
      console.log(result.SCHUL_NM);
      loadLaunch(eduCode, schoolCode);
      setIsSchoolInfoReady(!isSchoolInfoReady);
      setSchoolName(schoolName);
    }
  }, [schoolInfo, isSchoolInfoReady, schoolName])

  useEffect(() => {
    let result;
    if (launchInfo !== '') {
      try {
        result = launchInfo.mealServiceDietInfo[1].row[0].DDISH_NM;
      } catch (error) {
          console.log(error);
          if (error.name === 'TypeError') {
            result = "오늘은 급식이 없는 것 같습니다.  :<";
          }
      }
      console.log(result);
      setLaunchMenu(result);
    }
  }, [launchInfo])


  return (
    <div className='Launch'>
      <div className='launchInputField'>
        <label htmlFor='schoolInput' className='launchInputItem'>학교명</label>
        <input id='schoolInput' type="text" placeholder='학교 이름을 입력' value={school} onChange={changeInput} className='launchInputItem'></input>
        <label htmlFor='dateInput' className='launchInputItem'>날짜</label>
        <input id='dateInput' type="date" min="2000-01-01" max="2099-12-31" value={date} onChange={changeInput} className='launchInputItem'></input>
        <button onClick={loadSchoolInfo} className='launchInputItem'>확인</button>
      </div>
      <LaunchResult
        date={date}
        launchMenu={launchMenu}
        schoolName={schoolName}
      />
    </div>
  )
}


export default Launch;