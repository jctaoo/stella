import React, { useEffect } from "react"
import "./PassagePage.scss"
import { Redirect, useRouteMatch } from "react-router";
import BasePage from "../BasePage";
import { useDispatch, useSelector } from "react-redux";
import { createFetchPassageDetailAction, currentPassageSelector } from "../../Services/FetchPassageDetail";
import PassageDetailState, { isPassageDetailState } from "../../Models/PassageDetailState";
import PassageDetail from "../../Models/PassageDetail";
import { configSelector } from "../../Services/SelectConfig";
import Config from "../../Models/Config";
import { notFoundLink } from "../../Routes";
import PassageDetailView from "../../Views/PassageDetailView/PassageDetailView";
import LoadingPage from "../LoadingPage/LoadingPage";

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