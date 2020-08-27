import React from "react";
import BasePage from "../layout/base-page/base-page";
import SEO from "../components/SEO/SEO";
import useSiteMetadata from "../hooks/use-site-metadata";

export default function Index() {
  const description = useSiteMetadata().pageDescription?.home;
  return (
    <BasePage id="home-page">
      <SEO description={description} />
      {/* PASS */}
    </BasePage>
  );
}