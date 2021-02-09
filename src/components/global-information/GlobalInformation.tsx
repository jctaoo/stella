import React from "react";
import "./GlobalInformation.scss";

const GlobalInformation = ({ text }: { text: string }) => {
  return (
    <div id="global-information">
      <h1>{text}</h1>
    </div>
  );
};

export default GlobalInformation;
