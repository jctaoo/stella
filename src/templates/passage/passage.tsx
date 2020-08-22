import React from "react"
import "./PassagePage.scss"
import { graphql, useStaticQuery } from "gatsby";
import { PassageDetail } from "../../models/passage-content";
import PassageDetailView from "../../components/passage-detail/passage-detail";
import Config from "../../models/config";
import BasePage from "../../layout/base-page/base-page";
import { Redirect } from "@reach/router";

interface PassagePageData {
  passage: PassageDetail[]
  site: { siteMetadata: { config: Config } }
}

export default function PassagePage() {

  const data = useStaticQuery<PassagePageData>(graphql`
    {
      allPassagesDetail {
        item {
          identifier
          title
          abbr
          about {
            updateTimes
            tags {
              id
              title
            }
            category
            readTime
          }
        }
        content
        topImage
        circleImage
      }
      site {
        siteMetadata {
          config {
            discus {
              shortName
            }
          }
        }
      }
    }
  `);

  const currentPassage = data.passage[0];
  const config = data.site.siteMetadata.config.discus;

  const isNotFound = !!currentPassage

  return isNotFound ?
    <Redirect noThrow to={"/404"}/> :
    (() => {
      const passage = currentPassage as PassageDetail;
      return (
        <BasePage id="passage-page">
          <PassageDetailView passage={passage} disqusConfig={config}/>
        </BasePage>
      );
    })()
}
