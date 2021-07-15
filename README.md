# Stella, an easy using and beautiful blog based on [Gatsby](https://github.com/gatsbyjs/gatsby)

![preview](./static/preview.png)

## Overview

Welcome to Stella !! 🎉

Stella has three parts, Passages, Snippets, and About.

- Passages: To place all your passages.
- Snippets: To place something short and simple such as code snippets. (emm... Snippets just like Twitter tweets)
- About: To place your self-introduction.

## Usage

1. Install Gatsby cli

```shell
# npm
npm install -g gatsby-cli
# yarn
yarn global dd gatsby-cli
```

2. Create your site

```shell
gatsby new blog https://github.com/jctaoo/stella.git
```

3. Place your content in `./blog/content` and modify the field named `siteMetadata` in `./blog/gatsby-config.ts`. (For
   all configure options check [Configure Options](./Configure%20Options.md). Also
   check [Gatsby Config API](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/))

If you don't want to install Gatsby cli globally, just clone this repository to install. (first and second steps below)

## Passage And Snippet Metadata

Stella use yaml Markdown mate data, view in [HelloWorld.md](./content/posts/HelloWorld.md)

Stella supports following meta data fields

- category: (string optional)

- tags: (string[] optional)

- title: (string required)

- identifier: (string optional) The unique id of passage.

- topImage: (string optional) The path of large image. The image will show on the top of passage.

- topImageAlt: (string optional) The alt value of topImage.

- circleImage: (string optional) The path of circle image. The circle image will show beside title. It's useful when you
  want to show avatar.

- abbr: (string optional): The short version of the passage, Stella will display it in the thumbnail passage view, if
  the value is not provided, Stella will automatically intercept it.

- updateDates: (string[] optional) Format with 'YYYY-M-D', and in descending order of time.

## Snippets Writing Rules

- Only support one Code Block, and the Code Block must be at the top of markdown (not including yml metadata).
- Markdown in Content will be ignored.

## How to Show Diff in Code Block

- place a '+' behind your code line indicates the line is newly added.
- place a '-' behind your code line indicates the line will be removed.

Following code

```typescript
// adding codes
+console.log("🍔");
// removing codes
-console.log("💩");
```

Will look like this
![code-diff](./static/code_diff.png)

## Debug / Test your site

Unfortunately, there isn't a good way to debug with the code-less installation way now.

In the first way to install, you can use the following steps:

- Run `yarn start` or `npm run start` to view your site.
- If you want to modify your content, just stop the above command and restart it. (Hot reload comming soon...)

## Deploying

See [Gatsby Deploying and Hosting](https://www.gatsbyjs.com/docs/deploying-and-hosting/)

## License

[![License: MIT](https://img.shields.io/badge/License-0BSD-yellow.svg)](https://opensource.org/licenses/0BSD)

0BSD License

Copyright (c) 2021 jctaoo

[LICENSE](https://github.com/jctaoo/stella/blob/master/LICENSE) file
