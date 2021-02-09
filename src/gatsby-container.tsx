import React, { ReactElement } from "react";
import { WrapPageElementNodeArgs, WrapRootElementBrowserArgs } from "gatsby";
import AppContainer from "./layout/app-container/app-container";

export const wrapRootElement = (
  args: WrapRootElementBrowserArgs | WrapPageElementNodeArgs
) => {
  return <AppContainer>{args.element as ReactElement}</AppContainer>;
};
