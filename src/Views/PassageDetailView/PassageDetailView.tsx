import React from "react";
import PassageDetail from "../../Models/PassageDetail";
import PassageTitleView from "../PassageTitleView/PassageTitleView";
import PassageAboutView from "../PassageAboutView/PassageAboutView";
import marked from "marked";
import { DiscussionEmbed } from "disqus-react";
import { DiscusConfig } from "../../Models/Config";
import "./PassageDetailView.scss";

function PassageDetailView({passage, disqusConfig}: {passage: PassageDetail, disqusConfig?: DiscusConfig}) {
  return (
    <div className="passage-container">
      {
        !!passage.topImage ?
          <img src={passage.topImage} className="passage-top-image" /> :
          <></>
      }
      <div className="passage-title-container">
        {
          !!passage.circleImage ?
            <img src={passage.circleImage} className="passage-circle-image" /> :
            <></>
        }
        <div className="passage-title">
          <PassageTitleView title={passage.item.title}/>
          <PassageAboutView
            updateTimes={passage.item.about.updateTimes}
            tags={passage.item.about.tags}
            readTime={passage.item.about.readTime}
          />
        </div>
      </div>
      <div
        className="passage-content-container"
        dangerouslySetInnerHTML={{__html: marked(passage.markdownRaw)}}
      />
      {
        !!disqusConfig ?
          <div className="passage-comment-container">
            <DiscussionEmbed
              shortname={disqusConfig.shortName}
              config={{
                url: window.location.href,
                identifier: passage.item.identifier,
                title: passage.item.title,
              }}
            />
          </div> :
          <></>
      }
    </div>
  );
}

export default PassageDetailView;