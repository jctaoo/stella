export default `
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
`;