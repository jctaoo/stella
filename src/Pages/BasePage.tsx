import React, { HTMLAttributes } from "react";
import { motion } from "framer-motion";
import "./BasePage.scss"

function BasePage({children, id}: {children: any} & HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      id={id}
      className="base-page"
    >
      {children}
    </motion.div>
  );
}

export default BasePage;