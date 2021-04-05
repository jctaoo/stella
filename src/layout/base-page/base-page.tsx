import { motion } from "framer-motion";
import React, { HTMLAttributes, ReactNode } from "react";
import "./base-page.scss";

function BasePage({
  children,
  id,
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id={id}
      className="base-page"
    >
      {children}
    </motion.div>
  );
}

export default BasePage;
