import Config from "./config";
import SocialMedia from "./social-media";
import PageDescription from "./page-description";
import { CreativeCommons } from "./creative-commons";

type CreativeCommonsKey = keyof typeof CreativeCommons;

export interface SiteMetadata {
  config: Config
  routeConfigurations: {
    about: { title: string },
    passages: { title: string },
    snippets: { title: string },
  },
  pageDescription?: {
    home?: PageDescription,
    passages?: PageDescription,
    snippets?: PageDescription,
    about?: PageDescription,
  },
  medias: SocialMedia[],
  copyright?: {
    author?: string,
    creativeCommons?: CreativeCommonsKey
  }
}
