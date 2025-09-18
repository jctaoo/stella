import React from "react";

import SEO from "../components/SEO/SEO";
import useSiteMetadata from "../hooks/use-site-metadata";
import BasePage from "../layout/base-page/base-page";
import { graphql } from "gatsby";

export default function Index() {
  const description = useSiteMetadata().pageDescription?.home;
  return (
    <BasePage id="home-page">
      <SEO description={description} />
      {/* PASS */}
    </BasePage>
  );
}

export const query = graphql`
  fragment ImageDataFragment on ImageData {
    layout
    width
    height
    backgroundColor
    images {
      fallback {
        src
        sizes
        srcSet
      }
      sources {
        srcSet
        sizes
        media
        type
      }
    }
    placeholder {
      fallback
    }
  }
`;
