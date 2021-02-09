import React from "react";
import "./top-progress-bar.scss";
import { Progress } from "antd";

function TopProgressBar({ show }: { show: boolean }) {
  return (
    <div id="top-progress-bar" className={!show ? "top-progress-bar-hide" : ""}>
      <Progress percent={100} showInfo={false} status="active" size="small" />
    </div>
  );
}

export default TopProgressBar;
