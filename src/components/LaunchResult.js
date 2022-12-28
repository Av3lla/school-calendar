import React from "react";

function LaunchResult(props) {
  let resultDiv;

  if (props.launchMenu !== '') {
    let formattedLaunchMenu = props.launchMenu.replace(/<br\/>/g, '\n');
    resultDiv = <div className="resultField">
      <div className="resultTitle">{props.schoolName}<br />{props.date}</div>
      {formattedLaunchMenu}
    </div>;
  }

  return(
    resultDiv
  )
}

export default LaunchResult;