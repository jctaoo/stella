import Config from "./config";
import { CreativeCommons } from "./creative-commons";
import PageDescription from "./page-description";
import SocialMedia from "./social-media";

type CreativeCommonsKey = keyof typeof CreativeCommons;

export interface SiteMetadata {
  config: Config;
  routeConfigurations: {
    about: { title: string };
    passages: { title: string };
    snippets: { title: string };
  };
  pageDescription?: {
    home?: PageDescription;
    passages?: PageDescription;
    snippets?: PageDescription;
    about?: PageDescription;
  };
  medias: SocialMedia[];
  copyright?: {
    author?: string;
    creativeCommons?: CreativeCommonsKey;
  };
  bannerText?: string;
}
