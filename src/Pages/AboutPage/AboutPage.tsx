import React, { useEffect } from "react";
import "./AboutPage.scss";
import BasePage from "../BasePage";
import { useDispatch, useSelector } from "react-redux";
import { currentPassageSelector } from "../../Services/FetchPassageDetail";
import Config from "../../Models/Config";
import { configSelector } from "../../Services/Config";
import PassageDetailState, { isPassageDetailState } from "../../Models/PassageDetailState";
import PassageDetail from "../../Models/PassageDetail";
import { createFetchAboutAction } from "../../Services/FetchAbout";
import PassageDetailView from "../../Views/PassageDetailView/PassageDetailView";

function AboutPage() {
  const dispatch = useDispatch()

  // @ts-ignore
  const currentPassage = useSelector(currentPassageSelector);
  // @ts-ignore
  const config: Config = useSelector(configSelector);
  const isNotFound = currentPassage === PassageDetailState.notfound
  const isLoading = isPassageDetailState(currentPassage) || !currentPassage;

  // 获取数据
  useEffect(() => {
    dispatch(createFetchAboutAction());
  }, []);

  return (
    isLoading ? (<h1>LOADING</h1>) :
      (() => {
        const passage = currentPassage as PassageDetail;
        return (
          <BasePage id="about-page">
            <PassageDetailView passage={passage} disqusConfig={config.discus}/>
          </BasePage>
        );
      })()
  );
}

export default AboutPage;