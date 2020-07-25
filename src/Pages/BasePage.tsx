import React, { HTMLAttributes, HTMLProps } from "react";
import { motion } from "framer-motion";


// TODO
function BasePage({children, id}: {children: any} & HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      id={id}
    >
      {children}
    </motion.div>
  );
}

export default BasePage;