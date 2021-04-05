interface Config {
  siteName: string;
  homeLargeTitle?: string;
  disqus?: DisqusConfig;
  lang: string;
  host: string;
  experiment: {
    downloadWebPicture?: {
      enable: boolean;
      excludeUrlRegx: string[];
    };
  };
}
export default Config;

export interface DisqusConfig {
  shortName: string;
  developmentShortName: string;
}
