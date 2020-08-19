import React, { useEffect } from "react"
import "./PassagePage.scss"
import { Redirect, useRouteMatch } from "react-router";
import BasePage from "../BasePage";
import { useDispatch, useSelector } from "react-redux";
import { createFetchPassageDetailAction, currentPassageSelector } from "../../Services/FetchPassageDetail";
import { configSelector } from "../../Services/SelectConfig";
import Config from "../../Models/Config";
import { notFoundLink } from "../../Routes";
import PassageDetailView from "../../Views/PassageDetailView/PassageDetailView";
import LoadingPage from "../LoadingPage/LoadingPage";
import { ContentDetailState, isContentDetailState } from "../../Models/BaseContent";
import { PassageDetail } from "../../Models/Passage";

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
  const isNotFound = currentPassage === ContentDetailState.notfound
  const isLoading = isContentDetailState(currentPassage) || !currentPassage;

  // 获取数据
  useEffect(() => {
    dispatch(createFetchPassageDetailAction(passageId));
  }, []);

  return isNotFound ?
    <Redirect to={notFoundLink}/> :
    isLoading ? (<LoadingPage/>) :
      (() => {
        const passage = currentPassage as PassageDetail;
        return (
          <BasePage id="passage-page">
            <PassageDetailView passage={passage} disqusConfig={config.discus} />
          </BasePage>
        );
      })()
}

export default PassagePage