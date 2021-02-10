import {
  CreatePagesArgs,
  CreateResolversArgs,
  CreateSchemaCustomizationArgs,
  SourceNodesArgs,
} from "gatsby";
import * as path from "path";
import { PassageAbbr } from "./src/models/passage-content";
import { NodeData } from "./src/models/node-data";
import config from "./gatsby-config";
import Processor from "./scripts/processor";
import typeDefs from "./scripts/schema";
import { SiteMetadata } from "./src/models/site-metadata";
import { CreativeCommons } from "./src/models/creative-commons";

const siteMetadata: SiteMetadata = config.siteMetadata as SiteMetadata;

interface CreatePagesData {
  allPassage: NodeData<PassageAbbr>;
}

const processor = new Processor(
  {
    publicDir: path.resolve(__dirname, "public"),
    imageStaticDir: path.resolve(__dirname, "public", "static", "images"),
    postsDir: path.resolve(__dirname, "content", "posts"),
    snippetsDir: path.resolve(__dirname, "content", "snippets"),
    aboutDir: path.resolve(__dirname, "content", "about.md"),
  },
  {
    downloadWebPicture: {
      enable: !!siteMetadata.config.experiment.downloadWebPicture?.enable,
      excludeUrlRegx:
        siteMetadata.config.experiment.downloadWebPicture?.excludeUrlRegx ?? [],
    },
  }
);

export const createResolvers = async (args: CreateResolversArgs) => {
  const about = await processor.processAbout();

  if (
    !!siteMetadata.copyright?.creativeCommons &&
    !Object.keys(CreativeCommons).includes(
      siteMetadata.copyright.creativeCommons
    )
  ) {
    console.log("错误的 CreateCommons 值");
    console.log("您可能需要如下的值:");
    for (const key of Object.keys(CreativeCommons)) {
      console.log(
        `\t${key} (代表 ${
          CreativeCommons[key as keyof typeof CreativeCommons]
        } 协议)`
      );
    }
    console.log("如果您不想使用 CreativeCommons, 请去掉 creativeCommons 字段");
    console.log(
      "您可以跳转到 CreativeCommons 的网站 https://creativecommons.org/"
    );
    console.log(
      "或者使用 CreativeCommons 官方的方式来选择适合您的协议 https://creativecommons.org/choose/"
    );
    process.exit(-1);
  }

  const resolvers = {
    Query: {
      about: {
        type: "ContentDetail",
        resolve: (source: any, args: any, context: any, info: any) => {
          return about;
        },
      },
      siteMetadata: {
        type: "SiteMetadata",
        resolve: (source: any, args: any, context: any, info: any) => {
          return siteMetadata;
        },
      },
    },
  };
  args.createResolvers(resolvers);
};

export const createSchemaCustomization = async (
  args: CreateSchemaCustomizationArgs
) => {
  const { createTypes } = args.actions;
  createTypes(typeDefs);
};

export const sourceNodes = async (args: SourceNodesArgs) => {
  await processor.clearAndEnsureImageFolder();

  // 添加 posts
  const posts = await processor.processPosts();

  posts.abbrs.forEach((abbr) => {
    args.actions.createNode({
      ...abbr,
      id: args.createNodeId(abbr.identifier + "passage"),
      internal: {
        type: "Passage",
        contentDigest: args.createContentDigest(abbr),
      },
    });
  });
  posts.details.forEach((detail) => {
    args.actions.createNode({
      ...detail,
      id: args.createNodeId(detail.item.identifier + "detail"),
      internal: {
        type: "PassageDetail",
        contentDigest: args.createContentDigest(detail),
      },
    });
  });

  // 添加 snippets
  const snippets = await processor.processSnippets();

  snippets.details.forEach((detail) => {
    args.actions.createNode({
      ...detail,
      id: args.createNodeId(detail.item.identifier + "detail"),
      internal: {
        type: "Snippet",
        contentDigest: args.createContentDigest(detail),
      },
    });
  });

  // 添加 tag & category
  posts.tags.forEach((tag) => {
    args.actions.createNode({
      ...tag,
      id: args.createNodeId(tag.id),
      internal: {
        type: "PostTag",
        contentDigest: args.createContentDigest(tag),
      },
    });
  });
  posts.categories.forEach((category) => {
    args.actions.createNode({
      id: args.createNodeId(category),
      internal: {
        type: "PostCategory",
        contentDigest: args.createContentDigest(category),
        content: category,
      },
    });
  });
  snippets.tags.forEach((tag) => {
    args.actions.createNode({
      ...tag,
      id: args.createNodeId(tag.id),
      internal: {
        type: "SnippetTag",
        contentDigest: args.createContentDigest(tag),
      },
    });
  });
  snippets.categories.forEach((category) => {
    args.actions.createNode({
      id: args.createNodeId(category),
      internal: {
        type: "SnippetCategory",
        contentDigest: args.createContentDigest(category),
        content: category,
      },
    });
  });
};

export const createPages = async (args: CreatePagesArgs) => {
  const result = await args.graphql<CreatePagesData>(`
    {
      allPassage {
        edges {
          node {
            identifier
          }
        }
      }
    }
  `);
  result.data?.allPassage.edges.forEach((item) => {
    args.actions.createPage({
      path: `/passage/${item.node.identifier}`,
      component: path.resolve(
        __dirname,
        "src",
        "templates",
        "passage",
        "passage.tsx"
      ),
      context: {
        identifier: item.node.identifier,
      },
    });
  });
};
