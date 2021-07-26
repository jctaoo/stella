interface Config {
  siteName: string;
  homeLargeTitle?: string;
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

