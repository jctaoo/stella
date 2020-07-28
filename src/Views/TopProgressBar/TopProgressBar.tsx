import React from "react";
import "./TopProgressBar.scss";
import Progress from "antd/lib/progress";
// import StyleConstant from "../../Styles/Constant.scss";

// TODO
function TopProgressBar({show}: {show: boolean}) {
  return (
    <div id="top-progress-bar" className={!show ? "top-progress-bar-hide" : ""}>
      <Progress percent={100} showInfo={false} status="active" size="small" />
    </div>
  );
}

export default TopProgressBar;