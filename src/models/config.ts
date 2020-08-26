interface Config {
  siteName: string
  homeLargeTitle?: string
  discus?: DiscusConfig
}

export interface DiscusConfig {
  shortName: string
}

export default Config;