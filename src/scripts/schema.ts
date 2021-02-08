export default `
  enum CreativeCommons {
    by
    byNc
    byNcNd
    byNcSa
    byNd
    bySa
  }
  type ContentDetail {
    item: ContentAbbr!
    content: String!
    topImage: String
    circleImage: String
  }
  type ContentAbbr {
    identifier: String!
    title: String!
    abbr: String
    about: About!
    codeRaw: String
  }
  type About {
    updateTimes: [Date!]!
    tags: [Tag!]!
    category: String
    readTime: Int
  }
  type Copyright {
    author: String
    creativeCommons: CreativeCommons
  }
  type SiteMetadata {
    config: Config!
    routeConfigurations: RouteConfiguration!
    pageDescription: PageDescription
    medias: [SocialMedia!]!
    copyright: Copyright
  }
  type Config {
    siteName: String!
    homeLargeTitle: String
    disqus: DisqusConfig
    lang: String!
    host: String!
  }
  type DisqusConfig {
    shortName: String!
    developmentShortName: String!
  }
  type RouteConfiguration {
    about: RouteConfigurationItem!
    passages: RouteConfigurationItem!
    snippets: RouteConfigurationItem!
  }
  type RouteConfigurationItem {
    title: String!
  }
  type PageDescription {
    home: PageDescriptionItem
    passages: PageDescriptionItem
    snippets: PageDescriptionItem
    about: PageDescriptionItem
  }
  type PageDescriptionItem {
    title: String!
    keywords: [String!]!
    description: String
    largeImage: String
    largeImageAlt: String
  }
  type SocialMedia {
    identifier: String!
    iconName: String!
    title: String!
    link: String
    imageName: String
  }
`;
