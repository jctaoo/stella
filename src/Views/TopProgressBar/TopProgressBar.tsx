import React from "react";
import "./TopProgressBar.scoped.scss";

// TODO
function TopProgressBar({show}: {show: boolean}) {
  return (
    <div id="top-progress-bar" className={!show ? "top-progress-bar-hide" : ""}>

    </div>
  );
}

export default TopProgressBar;