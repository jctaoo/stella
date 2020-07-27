interface Config {

  siteName: string

  rootUrl: string

  homeLargeTitle?: string

  discus?: DiscusConfig

  code: CodeConfig

}

export interface DiscusConfig {

  shortName: string

}

export interface CodeConfig {

  highlightThemeName?: string

}

export default Config;