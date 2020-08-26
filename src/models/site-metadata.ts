import Config from "./config";
import SocialMedia from "./social-media";

export interface SiteMetadata {
  config: Config
  routeConfigurations: {
    about: { title: string },
    passages: { title: string },
    snippets: { title: string },
  },
  medias: SocialMedia[]
}