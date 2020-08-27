import * as path from "path";

const siteKeywords = ["blog", "jctaoo", "technology"];
const siteDescription = "Jctaoo's Blog."

export default {
  siteMetadata: {
    "config": {
      "discus": {
        "shortName": "jctaoo"              // !
      },
      "lang": "zh",                        // !
      "host": "localhost:9000",                 // !
      "siteName": "Jctaoo.",               // !
      "homeLargeTitle": "Jctaoo.",
    },
    "routeConfigurations": {               // !            
      "about": {                           // !
        "title": "about"                   // !
      },                                   // !
      "passages": {                        // !
        "title": "passages"                // !
      },                                   // !
      "snippets": {                        // !
        "title": "snippets"                // !
      }                                    // !
    },
    "pageDescription": {
      "home": {
        "title": "Home",                   // !
        "keywords": siteKeywords,          // !
        "description": siteDescription,    
        "largeImage": undefined,
        "largeImageAlt": undefined,
      },
      "passages": {
        "title": "Passages",               // !
        "keywords": siteKeywords,          // !
        "description": siteDescription,    
        "largeImage": undefined,
        "largeImageAlt": undefined,
      },
      "snippets": {
        "title": "Snippets",               // !
        "keywords": siteKeywords,          // !
        "description": siteDescription,    
        "largeImage": undefined,
        "largeImageAlt": undefined,
      },
      "about": {
        "title": "About",                  // !
        "keywords": siteKeywords,          // !
        "description": siteDescription,    
        "largeImage": undefined,
        "largeImageAlt": undefined,
      },
    },
    "medias": [                            // !
      {
        "identifier": "1",                 // !
        "iconName": "bilibili",            // !
        "title": "bilibili",               // !
        "link": "https://space.bilibili.com/155950817",
        "imageName": undefined
      },
      {
        "identifier": "2",                 // !
        "iconName": "github",              // !
        "title": "github",                 // !
        "link": "https://github.com/jctaoo",
        "imageName": undefined
      },
      {
        "identifier": "3",                 // !
        "iconName": "mail",                // !
        "title": "mail",                   // !
        "link": "mailto:jctaoo@outlook.com",
        "imageName": undefined
      },
      {
        "identifier": "4",                 // !
        "iconName": "twitter",             // !
        "title": "twitter",                // !
        "link": undefined,
        "imageName": undefined
      },
      {
        "identifier": "5",                 // !
        "iconName": "wechat",              // !
        "title": "wechat",                 // !
        "link": undefined,
        "imageName": undefined
      }
    ]
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet'
  ],
}