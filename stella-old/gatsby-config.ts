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
    copyright: {
      author: "jctaoo",
      creativeCommons: "byNcSa"
    },
    config: {
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
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PRESERVE_WEBPACK_CACHE: true,
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
  },
  plugins: [
    "gatsby-plugin-antd",
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        formats: ["auto", "webp", "avif"],
        defaults: {},
        placeholder: `dominantColor`, // or BLURRED
        width: 625,
        failOnError: true,
        base64Width: 20, // TODO:
        forceBase64Format: `png`, // valid formats: png,jpg,webp
        useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
        stripMetadata: true,
        jpegProgressive: true,
        defaultQuality: 50,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-image",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        footnotes: true,
        gfm: true,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 512,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`
            }
          }
        ],
      },
    },
    "gatsby-plugin-typescript",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",
  ],
};
