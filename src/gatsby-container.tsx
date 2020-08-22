import React, { ReactElement } from "react";
import { WrapRootElementBrowserArgs } from "gatsby";
import AppContainer from "./layout/app-container/app-container";

export const wrapRootElement = (args: WrapRootElementBrowserArgs) => {
  return (
    <AppContainer>
      { args.element as ReactElement }
    </AppContainer>
  )
}