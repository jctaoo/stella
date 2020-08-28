import { SiteMetadata } from "../models/site-metadata";
import { useStaticQuery, graphql } from "gatsby";

const useSiteMetadata = (): SiteMetadata => {
  const data = useStaticQuery<{ siteMetadata: SiteMetadata }>(graphql`
    {
      siteMetadata {
        config {
          siteName
          homeLargeTitle
          discus {
            shortName
          }
          lang
          host
        }
        routeConfigurations {
          about { title }
          passages { title }
          snippets { title }
        }
        pageDescription {
          home {
            title
            keywords
            description
            largeImage
            largeImageAlt
          }
          passages {
            title
            keywords
            description
            largeImage
            largeImageAlt
          }
          snippets {
            title
            keywords
            description
            largeImage
            largeImageAlt
          }
          about {
            title
            keywords
            description
            largeImage
            largeImageAlt
          }
        }
        medias {
          identifier
          iconName
          title
          link
          imageName
        }
      }
    }
  `);
  return data.siteMetadata;
}

export default useSiteMetadata;