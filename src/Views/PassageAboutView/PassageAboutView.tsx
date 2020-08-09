import React from "react"
import "./PassageAboutView.scss"
import moment from "moment"
import { PassageAbout } from "../../Models/PassageAbout";
import { useHistory } from "react-router";

function PassageAboutView(about: PassageAbout) {
  const lastUpdateTime = about.updateTimes[about.updateTimes.length - 1]
  const timeStr = moment(lastUpdateTime).format("YYYY/M/D")
  const history = useHistory();

  const readTimeStr = moment.duration(about.readTime).minutes() + "min"

  return (
    <span className="passage-about">
      <span className="passage-about-information">
        <span className="passage-information">
          <span className="passage-information-icon icon-calendar"/>
          <span className="passage-information-value">
            {timeStr}
          </span>
        </span>
        <span className="passage-information">
          <span className="passage-information-icon icon-timer"/>
          <span className="passage-information-value">
            {readTimeStr}
          </span>
        </span>
      </span>
      <span className="passage-about-tags">
        {
          [
            <span className="passage-tag" key={about.category} onClick={() => {

            }}>
              {about.category}
            </span>,
            ...about.tags.map((item) => (
              <span className="passage-tag" key={item.id} onClick={() => {

              }}>
                #{item.title}
              </span>
            ))
          ]
        }
      </span>
    </span>
  );
}

export default PassageAboutView