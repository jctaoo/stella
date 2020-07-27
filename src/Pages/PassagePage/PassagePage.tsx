import React, { useEffect } from "react"
import "./PassagePage.scss"
import { useRouteMatch } from "react-router";
import PassageTitleView from "../../Views/PassageTitleView/PassageTitleView";
import PassageAboutView from "../../Views/PassageAboutView/PassageAboutView";
import BasePage from "../BasePage";
import { useDispatch, useSelector } from "react-redux";
import { createFetchPassageDetailAction, currentPassageSelector } from "../../Services/FetchPassageDetail";
import PassageDetailState from "../../Models/PassageDetailState";
import marked from "marked";

interface PassagePageRouteParams {
  id: string
}

function PassagePage() {
  const passageId = (useRouteMatch().params as PassagePageRouteParams).id

  const dispatch = useDispatch()
  // @ts-ignore
  const currentPassage = useSelector(currentPassageSelector);
  const isLoading = currentPassage === PassageDetailState.fail || currentPassage === PassageDetailState.loading || !currentPassage;

  // 获取数据
  useEffect(() => {
    dispatch(createFetchPassageDetailAction(passageId));
  }, []);

  return isLoading ? (<h1>LOADING</h1>) :
    (
      <BasePage id="passage-page">
        <div className="passage-container">
          <div className="passage-title-container">
            <PassageTitleView title={currentPassage.item.title}/>
            <PassageAboutView
              updateTimes={currentPassage.item.about.updateTimes}
              tags={currentPassage.item.about.tags}
              readTime={currentPassage.item.about.readTime}
            />
          </div>
          <div
            className="passage-content-container"
            dangerouslySetInnerHTML={{__html: marked(currentPassage.markdownRaw)}}
          />
        </div>
      </BasePage>
    )
}

export default PassagePage