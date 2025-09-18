import React from "react";

import "./notfound.scss";
import SEO from "../../components/SEO/SEO";
import useSiteMetadata from "../../hooks/use-site-metadata";
import BasePage from "../../layout/base-page/base-page";

export default function NotFoundPage() {
  const description = useSiteMetadata().pageDescription?.home;
  return (
    <BasePage id="not-found-page">
      <SEO description={description} />
      <div id="not-found-page-content">
        <div id="not-found-page-explanation">
          <h1>Page Not Found</h1>
          <p>Why not use the search function to view other content?</p>
        </div>
      </div>
      <div id="not-found-page-background">
        <span id="not-found-page-background-label">
          <p id="not-found-page-background-label-text">404</p>
        </span>
      </div>
    </BasePage>
  );
}
