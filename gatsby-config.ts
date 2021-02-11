const siteKeywords = [
  "博客",
  "Jctaoo",
  "个人主页",
  "个人介绍",
  "生活日常",
  "技术",
  "分享",
  "开发",
  "产品",
  "设计",
  "故事",
  "Tao Juncheng",
];

export default {
  siteMetadata: {
    config: {
      disqus: {
        shortName: "jctaoo",
        developmentShortName: "jctaoo-dev",
      },
      lang: "zh",
      host: "https://stella-demo-site.vercel.app/",
      siteName: "Jctaoo.",
      homeLargeTitle: "Jctaoo.",
      experiment: {
        downloadWebPicture: {
          enable: true,
          excludeUrlRegx: ["juejin"],
        },
      },
    },
    bannerText: "Stella Demo Site",
    routeConfigurations: {
      about: {
        title: "关于",
      },
      passages: {
        title: "文章",
      },
      snippets: {
        title: "片段",
      },
    },
    pageDescription: {
      home: {
        title: "主页",
        keywords: siteKeywords,
        description: "Jctaoo的个人网站",
        largeImage: undefined,
        largeImageAlt: undefined,
      },
      passages: {
        title: "文章列表",
        keywords: [...siteKeywords, "文章列表"],
        description: "所有发布的文章列表",
        largeImage: undefined,
        largeImageAlt: undefined,
      },
      snippets: {
        title: "片段列表",
        keywords: [...siteKeywords, "片段列表", "vlog"],
        description: "所有发布的片段列表, 记录代码与日常片段",
        largeImage: undefined,
        largeImageAlt: undefined,
      },
      about: {
        title: "关于",
        keywords: [...siteKeywords, "关于", "简介", "说明"],
        description: "关于Jctaoo的个人网站",
        largeImage: undefined,
        largeImageAlt: undefined,
      },
    },
    medias: [
      // !
      {
        identifier: "1",
        iconName: "bilibili",
        title: "bilibili",
        link: undefined,
        imageName: undefined,
      },
      {
        identifier: "2",
        iconName: "github",
        title: "github",
        link: "https://github.com/jctaoo",
        imageName: "github_qr_code.png",
      },
      {
        identifier: "3",
        iconName: "mail",
        title: "mail",
        link: "mailto:jctaoo@outlook.com",
        imageName: undefined,
      },
      {
        identifier: "4",
        iconName: "twitter",
        title: "twitter",
        link: undefined,
        imageName: undefined,
      },
      {
        identifier: "5",
        iconName: "wechat",
        title: "wechat",
        link: undefined,
        imageName: undefined,
      },
    ],
  },
  plugins: [
    "gatsby-plugin-antd",
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    "gatsby-plugin-typescript",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        devMode: true,
        openAnalyzer: false,
      },
    },
  ],
};
