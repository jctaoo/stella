import React, { useEffect } from "react";
import "./AboutPage.scss";
import BasePage from "../BasePage";
import { useDispatch, useSelector } from "react-redux";
import { currentPassageSelector } from "../../Services/FetchPassageDetail";
import Config from "../../Models/Config";
import { configSelector } from "../../Services/SelectConfig";
import { createFetchAboutAction } from "../../Services/FetchAbout";
import PassageDetailView from "../../Views/PassageDetailView/PassageDetailView";
import LoadingPage from "../LoadingPage/LoadingPage";
import { isContentDetailState } from "../../Models/BaseContent";
import { PassageDetail } from "../../Models/Passage";

function AboutPage() {
  const dispatch = useDispatch()

  // @ts-ignore
  const currentPassage = useSelector(currentPassageSelector);
  // @ts-ignore
  const config: Config = useSelector(configSelector);
  const isLoading = isContentDetailState(currentPassage) || !currentPassage;

  // 获取数据
  useEffect(() => {
    dispatch(createFetchAboutAction());
  }, []);

  return (
    isLoading ? (<LoadingPage/>) :
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