import React, { HTMLAttributes, MouseEvent } from "react";
import PassageTitle from "../passage-title/passage-title";
import PassageAbout from "../passage-about/passage-about";
import { DiscussionEmbed } from "disqus-react";
import "./passage-detail.scss";
import { BaseContentDetail } from "../../models/base-content";
import { DisqusConfig } from "../../models/config";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import { AppEnv, useEnv } from "../../hooks/useEnv";
import Footer from "../footer/footer";
import { CreativeCommons } from "../../models/creative-commons";

export enum PassageDetailViewMode {
  Full,
  Partial
}

function PassageDetail(
  {passage, disqusConfig, mode = PassageDetailViewMode.Full, className, showFooter = true}:
    { passage: BaseContentDetail, disqusConfig?: DisqusConfig, mode?: PassageDetailViewMode, showFooter?: Boolean
    } & HTMLAttributes<any>
) {

  const onPassageContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    // TODO 优化
    if ((e.target as HTMLDivElement).className.includes("passage-inner-link") && (e.target as HTMLDivElement).tagName.toLocaleLowerCase() === "a") {
      const href = (e.target as HTMLLinkElement).getAttribute("href");
      if (typeof href === "string" && href.startsWith("/")) {
        e.preventDefault();
        navigate(href).then();
      }
    }
  }

  const url = useLocation().href;
  const disqusShortName = useEnv() === AppEnv.dev ? disqusConfig?.developmentShortName : disqusConfig?.shortName;

  return (
    <div className={`passage-container ${className ? className : ""}`}>
      {
        (!!passage.topImage && mode === PassageDetailViewMode.Full) ?
          <img src={passage.topImage} className="passage-top-image"/> :
          <></>
      }
      <div className="passage-title-container">
        {
          (!!passage.circleImage && mode === PassageDetailViewMode.Full) ?
            <img src={passage.circleImage} className="passage-circle-image"/> :
            <></>
        }
        <div className="passage-title">
          <PassageTitle title={passage.item.title}/>
          {
            PassageDetailViewMode.Full !== mode ?
              <></> :
              <PassageAbout
                {...passage.item.about}
              />
          }
        </div>
      </div>
      <div
        className={`
          passage-content-container
          ${mode === PassageDetailViewMode.Partial ? "partial" : ""}
        `}
        id="passage-content-container"
        onClick={onPassageContainerClick}
        dangerouslySetInnerHTML={{__html: passage.content}}
        style={{
          marginTop: PassageDetailViewMode.Full !== mode ? 22 : undefined,
        }}
      />
      {PassageDetailViewMode.Full === mode ?
        <></> :
        <PassageAbout
          {...passage.item.about}
        />
      }
      {
        (!!disqusShortName) ?
          <div className="passage-comment-container">
            <DiscussionEmbed
              shortname={disqusShortName}
              config={{
                url: url,
                identifier: passage.item.identifier,
                title: passage.item.title,
              }}
            />
          </div> :
          <></>
      }
      {
        mode === PassageDetailViewMode.Full && !!showFooter ?
          <Footer/> :
          <></>
      }
    </div>
  );
}

export default PassageDetail;
