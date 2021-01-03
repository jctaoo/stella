interface Config {
  siteName: string
  homeLargeTitle?: string
  disqus?: DisqusConfig
  lang: string
  host: string
  experiment: {
    downloadNebPicture: boolean
  }
}

export interface DisqusConfig {
  shortName: string
}

export default Config;