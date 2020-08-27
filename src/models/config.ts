interface Config {
  siteName: string
  homeLargeTitle?: string
  discus?: DiscusConfig
  lang: string
  host: string
}

export interface DiscusConfig {
  shortName: string
}

export default Config;