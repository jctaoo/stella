import React, { useEffect, useState } from "react";
import "./PassageListPage.scss"
import PassageItemView from "../../Views/PassageItemView/PassageItemView";
import BasePage from "../BasePage";
import { useDispatch, useSelector, useStore } from "react-redux";
import AppState from "../../Models/AppState";
import { motion } from "framer-motion";
import PassageAbbr from "../../Models/PassageAbbr";
import { useHistory, useRouteMatch } from "react-router";
import { categoriesSelector } from "../../Services/SelectCategories";
import { passageLink } from "../../Routes";

interface PassageListPageTagRouteParams {
  tag: string
}
interface PassageListPageCategoryRouteParams {
  category: string
}

function PassageListPage() {
  const history = useHistory();
  const routeParams = useRouteMatch().params;
  const dispatch = useDispatch();
  let tagFilter: string | undefined = undefined;
  let categoryFilter: string | undefined = undefined;

  if ('tag' in routeParams) {
    tagFilter = (routeParams as PassageListPageTagRouteParams).tag.toLowerCase();
  } else if ('category' in routeParams) {
    categoryFilter = (routeParams as PassageListPageCategoryRouteParams).category.toLowerCase();
  }

  const cancelFilter = () => {
    history.push(passageLink);
  }

  let passages = useSelector<AppState, PassageAbbr[]>(state => state.passages);
  // console.log("render...") // TODO 这里回调用两次？

  // @ts-ignore
  if (tagFilter) {
    passages = passages.filter(e => e.about.tags.map(t => t.title.toLowerCase()).includes(tagFilter!));
  } else if (categoryFilter) {
    passages = passages.filter(e => e.about.category?.toLowerCase() === categoryFilter);
  }

  console.log("render")

  return (
    <BasePage id="passage-list-page">
      <motion.div
        initial={{translateY:500}}
        animate={{translateY:0}}
        exit={{translateY:500}}
        className="passage-list-container"
      >
        {
          tagFilter || categoryFilter ?
            <span className="passage-list-title">
              <h1 className="passage-list-title-content">
                {!!tagFilter ? '#' + tagFilter : categoryFilter}
              </h1>
              <h1 className="passage-list-title-description">的内容</h1>
              <a className="passage-list-title-cancel" onClick={cancelFilter}>
                取消
              </a>
            </span> :
            <></>
        }
        <div className="passage-list" key="passage-list">
          {
            passages.map(item => (
              <PassageItemView passage={item} key={item.identifier}/>
            ))
          }
        </div>
      </motion.div>
    </BasePage>
  )
}

export default PassageListPage