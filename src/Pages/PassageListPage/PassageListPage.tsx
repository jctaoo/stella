import React from "react";
import "./PassageListPage.scss"
import PassageItemView from "../../Views/PassageItemView/PassageItemView";
import BasePage from "../BasePage";
import { useSelector } from "react-redux";
import AppState from "../../Models/AppState";
import { motion } from "framer-motion";
import PassageAbbr from "../../Models/PassageAbbr";

function PassageListPage() {
  const passages = useSelector<AppState, PassageAbbr[]>(state => state.passages);
  // console.log("render...") // TODO 这里回调用两次？
  return (
    <BasePage id="passage-list-page">
      <motion.div
        initial={{translateY:500}}
        animate={{translateY:0}}
        exit={{translateY:500}}
      >
        <div id="passage-list" key="passage-list">
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