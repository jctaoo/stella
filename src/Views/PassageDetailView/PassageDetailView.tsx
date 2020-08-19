import React, { HTMLAttributes } from "react";
import PassageTitleView from "../PassageTitleView/PassageTitleView";
import PassageAboutView from "../PassageAboutView/PassageAboutView";
import marked from "marked";
import { DiscussionEmbed } from "disqus-react";
import { DiscusConfig } from "../../Models/Config";
import "./PassageDetailView.scss";
import { PassageDetail } from "../../Models/Passage";
import { BaseContentDetail } from "../../Models/BaseContent";

export enum PassageDetailViewMode {
  Full,
  Partial
}

function PassageDetailView(
  {passage, disqusConfig, mode = PassageDetailViewMode.Full, className}:
    {passage: BaseContentDetail, disqusConfig?: DiscusConfig, mode?: PassageDetailViewMode} & HTMLAttributes<any>
) {
  return (
    <div className={`passage-container ${className ? className : ""}`}>
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
          {
            PassageDetailViewMode.Full !== mode ?
              <></> :
              <PassageAboutView
                updateTimes={passage.item.about.updateTimes}
                tags={passage.item.about.tags}
                readTime={passage.item.about.readTime}
              />
          }
        </div>
      </div>
      <div
        className={`
          passage-content-container 
          ${mode === PassageDetailViewMode.Partial ? "partial" : ""}
        `}
        dangerouslySetInnerHTML={{__html: marked(passage.markdownRaw)}}
        style={{
          marginTop: PassageDetailViewMode.Full !== mode ? 22 : undefined,
        }}
      />
      { PassageDetailViewMode.Full === mode ?
        <></> :
        <PassageAboutView
          updateTimes={passage.item.about.updateTimes}
          tags={passage.item.about.tags}
          readTime={passage.item.about.readTime}
        />
      }
      {
        (!!disqusConfig && mode === PassageDetailViewMode.Full) ?
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