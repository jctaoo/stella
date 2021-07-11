import * as path from "path";

import {
  CreateNodeArgs,
  CreatePagesArgs,
  CreateResolversArgs,
  CreateSchemaCustomizationArgs
} from "gatsby";
import { FileSystemNode } from "gatsby-source-filesystem";

import config from "./gatsby-config";
import Processor from "./scripts/processor";
import typeDefs from "./scripts/schema";
import { CreativeCommons } from "./src/models/creative-commons";
import { NodeData } from "./src/models/node-data";
import { PassageAbbr } from "./src/models/passage-content";
import { SiteMetadata } from "./src/models/site-metadata";

const FILE_SYSTEM_TYPE = "File";

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
    aboutPath: path.resolve(__dirname, "content", "about.md"),
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
  if (
    !!siteMetadata.copyright?.creativeCommons &&
    !Object.keys(CreativeCommons).includes(
      siteMetadata.copyright.creativeCommons
    )
  ) {
    args.reporter.panic(
      `
错误的 CreateCommons 值, 您可能需要如下的值:
${Object.keys(CreativeCommons)
  .map(
    (key) =>
      `\t$'{key}' (代表 ${
        CreativeCommons[key as keyof typeof CreativeCommons]
      } 协议)`
  )
  .join("\n")}
如果您不想使用 CreativeCommons, 请去掉 creativeCommons 字段
您可以跳转到 CreativeCommons 的网站 https://creativecommons.org/
或者使用 CreativeCommons 官方的方式来选择适合您的协议 https://creativecommons.org/choose/
      `,
      new Error("Bad `createCommons` value")
    );
  }

  const resolvers = {
    Query: {
      siteMetadata: {
        type: "SiteMetadata",
        resolve: (/*source: any, args: any, context: any, info: any*/) => {
          return siteMetadata;
        },
      },
    },
  };
  args.createResolvers(resolvers);
};

export const onCreateNode = async (args: CreateNodeArgs) => {
  if (args.node.internal.type === FILE_SYSTEM_TYPE) {
    await processor.transformFileNode(
      args.node as FileSystemNode,
      args.actions.createNode,
      args.createNodeId,
      args.createContentDigest
    );
  }
};

export const onPreBootstrap = async () => {
  await processor.clearAndEnsureImageFolder();
}

export const createSchemaCustomization = async (
  args: CreateSchemaCustomizationArgs
) => {
  const { createTypes } = args.actions;
  createTypes(typeDefs);
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
