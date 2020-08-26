import * as path from "path";

export default {
  siteMetadata: {
    title: "Jctaoo.",
    config: {
      discus: {
        shortName: "jctaoo",
      },
    },
    routeConfigurations: {
      about: { title: "about" },
      passages: { title: "passages" },
      snippets: { title: "snippets" },
    },
    medias: [
      { identifier: "1", iconName: "bilibili", title: "bilibili", link: "https://space.bilibili.com/155950817" },
      { identifier: "2", iconName: "github", title: "github", link: "https://github.com/jctaoo" },
      { identifier: "3", iconName: "mail", title: "mail", link: "mailto:jctaoo@outlook.com" },
      { identifier: "4", iconName: "twitter", title: "twitter" },
      { identifier: "5", iconName: "wechat", title: "wechat" },
    ]
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
  ],
}