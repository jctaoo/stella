# Stella Configure Options

## Explanations

### (Optional) Config for [disqus](https://disqus.com/):

`config.disqus.shortName` string: Your short name of disqus.

`config.disqus.developmentShortName` string: Same as shortName but only for development.

### (Required) Experiments Features:

Note: If you don't need any experimental feature, just provide `{}` for `config.experiment`

`config.experiment.downloadWebPicture` optional: Stella will download Web Page in your content to ensure that pictures are always presented in the same way.

`config.experiment.downloadWebPicture.enable` bool: Whether to turn on this feature.

`config.experiment.downloadWebPicture.excludeUrlRegx` string[]: The list of regular expression indicates links to ignore.

### (Optional) Copyright:

`copyright.author` string optional: Author of site.

`copyright.creativeCommons` string optional: [Creative Commons](https://creativecommons.org/). You can choose your option in https://creativecommons.org/choose/.

### (Required) Routes Configure:

Note that `routeName` just can only be the value includes 'about', 'passages', 'snippets'

`routeConfigurations.${routeName}.title` string: title of `routeName` route.

### (Optional) Page Descriptions (to support SEO):

Note that `pageName` just can only be the value includes 'home', 'about', 'passages', 'snippets'

Here are following simple options need to be configured for the page:

- `pageDescription.${pageName}.title` string
- `pageDescription.${pageName}.keywords` string[]
- `pageDescription.${pageName}.description` string optional
- `pageDescription.${pageName}.largeImage` string optional
- `pageDescription.${pageName}.largeImageAlt` string optional

### (Required Array) Social Medias:

If you don't need show ant social media on your site, just provide `[]` value to `medias`.

Stella support following platforms:

- [BiliBili](https://www.bilibili.com/)
- [GitHub](https://github.com)
- Mail
- [Twitter](https://twitter.com)
- [WeChat](https://www.wechat.com/en/)

`medias[n].identifier` string: Used to identify different items, as long as you don’t use the same value.

`medias[n].iconName` string: Platform image's name. Support ('bilibili', 'github', 'mail', 'twitter', 'wechat').

`medias[n].title` string: Title of this platform.

`medias[n].link` string optional: The link to jump where you want. If you don't provide link, Stella won't do any thing when user click.

`medias[n].imageName` string optional: A path relative to the `static` directory, when the user puts the mouse on the platform icon, the picture will be displayed. It's useful for QR Code.

### Other Configs & Options:

`config.lang` string: Language of your site.

`config.host` string: The host of your site.

`config.siteName` string: The name of your site.

`config.homeLargeTitle` string: The large title place in home page. If not set, stella will place siteName to home page.

`bannerText` string optional: To show a banner on your site. If you don't provide any value, Stella won't display the banner on your site.

## Example Config File:

```json
{
  "config": {
    "disqus": {
      "shortName": "jctaoo",
      "developmentShortName": "jctaoo-dev"
    },
    "lang": "zh",
    "host": "http://localhost:5000",
    "siteName": "Jctaoo.",
    "homeLargeTitle": "Jctaoo.",
    "experiment": {
      "downloadWebPicture": {
        "enable": true,
        "excludeUrlRegx": ["juejin"]
      }
    }
  },
  "bannerText": "Stella Demo Site",
  "copyright": {
    "author": "jctaoo",
    "creativeCommons": "by"
  },
  "routeConfigurations": {
    "about": {
      "title": "关于"
    },
    "passages": {
      "title": "文章"
    },
    "snippets": {
      "title": "片段"
    }
  },
  "pageDescription": {
    "home": {
      "title": "主页",
      "keywords": [],
      "description": "Jctaoo的个人网站"
    },
    "passages": {
      "title": "文章列表",
      "keywords": ["文章列表"],
      "description": "所有发布的文章列表"
    },
    "snippets": {
      "title": "片段列表",
      "keywords": ["片段列表", "vlog"],
      "description": "所有发布的片段列表, 记录代码与日常片段"
    },
    "about": {
      "title": "关于",
      "keywords": [, "关于", "简介", "说明"],
      "description": "关于Jctaoo的个人网站"
    }
  },
  "medias": [
    {
      "identifier": "1",
      "iconName": "bilibili",
      "title": "bilibili"
    },
    {
      "identifier": "2",
      "iconName": "github",
      "title": "github",
      "link": "https://github.com/jctaoo",
      "imageName": "github_qr_code.png"
    },
    {
      "identifier": "3",
      "iconName": "mail",
      "title": "mail",
      "link": "mailto:jctaoo@outlook.com"
    },
    {
      "identifier": "4",
      "iconName": "twitter",
      "title": "twitter"
    },
    {
      "identifier": "5",
      "iconName": "wechat",
      "title": "wechat"
    }
  ]
}
```
