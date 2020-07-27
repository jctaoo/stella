import React, { useEffect } from "react"
import "./PassagePage.scss"
import { Redirect, useRouteMatch } from "react-router";
import PassageTitleView from "../../Views/PassageTitleView/PassageTitleView";
import PassageAboutView from "../../Views/PassageAboutView/PassageAboutView";
import BasePage from "../BasePage";
import { useDispatch, useSelector } from "react-redux";
import { createFetchPassageDetailAction, currentPassageSelector } from "../../Services/FetchPassageDetail";
import PassageDetailState, { isPassageDetailState } from "../../Models/PassageDetailState";
import marked from "marked";
import { DiscussionEmbed } from "disqus-react";
import PassageDetail from "../../Models/PassageDetail";
import { configSelector } from "../../Services/Config";
import Config from "../../Models/Config";
import { notFoundLink } from "../../Routes";

interface PassagePageRouteParams {
  id: string
}

function PassagePage() {
  const passageId = (useRouteMatch().params as PassagePageRouteParams).id

  const dispatch = useDispatch()

  // @ts-ignore
  const currentPassage = useSelector(currentPassageSelector);
  // @ts-ignore
  const config: Config = useSelector(configSelector);
  const isNotFound = currentPassage === PassageDetailState.notfound
  const isLoading = isPassageDetailState(currentPassage) || !currentPassage;

  // 获取数据
  useEffect(() => {
    dispatch(createFetchPassageDetailAction(passageId));
  }, []);

  return isNotFound ?
    <Redirect to={notFoundLink}/> :
    isLoading ? (<h1>LOADING</h1>) :
      (() => {
        console.log("render")
        const passage = currentPassage as PassageDetail;
        return (
          <BasePage id="passage-page">
            <div className="passage-container">
              <div className="passage-title-container">
                <PassageTitleView title={passage.item.title}/>
                <PassageAboutView
                  updateTimes={passage.item.about.updateTimes}
                  tags={passage.item.about.tags}
                  readTime={passage.item.about.readTime}
                />
              </div>
              <div
                className="passage-content-container"
                dangerouslySetInnerHTML={{__html: marked(currentPassage.markdownRaw)}}
              />
              {
                !!config.discus ?
                  <div className="passage-comment-container">
                    <DiscussionEmbed
                      shortname={config.discus.shortName}
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
          </BasePage>
        );
      })()
}

export default PassagePage