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
import { passageLink, routeToPassageListWithFilter } from "../../Routes";
import PassageFilterView from "./PassageFilterView";
import { useFilter } from "../../Services/UseFilter";
import { PassageTag } from "../../Models/PassageTag";
import { tagsSelector } from "../../Services/SelectTags";

interface PassageListPageTagRouteParams {
  tag: string
}
interface PassageListPageCategoryRouteParams {
  category: string
}

function PassageListPage() {
  const history = useHistory();
  const [tagFilter, categoryFilter] = useFilter();

  const cancelCategoryFilter = () => {
    routeToPassageListWithFilter(history, { tag: tagFilter });
  }

  const cancelTagFilter = () => {
    routeToPassageListWithFilter(history, { category: categoryFilter });
  }

  let passages = useSelector<AppState, PassageAbbr[]>(state => state.passages);
  passages = passages.filter(item => {
    let flag = true;
    if (tagFilter) {
      flag = item.about.tags.map(t => t.title.toLowerCase()).includes(tagFilter.toLowerCase());
    }
    if (categoryFilter) {
      flag = item.about.category?.toLowerCase() === categoryFilter;
    }
    return flag;
  })

  // @ts-ignore
  const tags: PassageTag[] = useSelector(tagsSelector);
  // @ts-ignore
  const categories: string[] = useSelector(categoriesSelector);

  const goToCategory = (category: string) => {
    routeToPassageListWithFilter(history, { tag: tagFilter, category: category });
  }

  const goToTag = (tag: PassageTag) => {
    console.log("tag")
    routeToPassageListWithFilter(history, { tag: tag.title, category: categoryFilter });
  }

  return (
    <BasePage id="passage-list-page">
      <motion.div
        initial={{translateY:500}}
        animate={{translateY:0}}
        exit={{translateY:500}}
        className="passage-list-container"
      >
        { /* 若需要隐藏 passage-list-title 则应用 passage-list-title-hide class */ }
        <span className="passage-list-title">
          <PassageFilterView
            content={categoryFilter ? categoryFilter : "所有"}
            description={"分类的内容"}
            cancelButtonTitle={"取消"}
            onCancelButtonClick={cancelCategoryFilter}
            dataSource={categories}
            onItemSelected={goToCategory}
            itemSelected={category => category.toLowerCase() === categoryFilter?.toLowerCase()}
            itemTitle={category => category}
          />
          <PassageFilterView
            content={tagFilter ? tagFilter : "所有"}
            description={"标签的内容"}
            cancelButtonTitle={"取消"}
            onCancelButtonClick={cancelTagFilter}
            dataSource={tags}
            onItemSelected={goToTag}
            itemSelected={tag => tag.title.toLowerCase() === tagFilter?.toUpperCase()}
            itemTitle={tag => tag.title}
          />
        </span>
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