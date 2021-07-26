import * as path from "path";

import {
  CreatePagesArgs,
  CreateResolversArgs,
  CreateSchemaCustomizationArgs,
} from "gatsby";

import config from "./gatsby-config";
import { checkCreateComments } from "./scripts/checkCreateCommons";
import Processor from "./scripts/processor";
import { RemarkNode } from "./scripts/remarkNode";
import { localGql } from "./scripts/utils";
import { NodeData } from "./src/models/node-data";
import { PassageAbbr } from "./src/models/passage-content";
import { SiteMetadata } from "./src/models/site-metadata";

const siteMetadata: SiteMetadata = config.siteMetadata as SiteMetadata;

interface CreatePagesData {
  allPassage: NodeData<PassageAbbr>;
}

interface AllRemarkData {
  allMarkdownRemark: NodeData<RemarkNode>;
}

const processor = new Processor({
  postsDir: path.resolve(__dirname, "content", "posts"),
  snippetsDir: path.resolve(__dirname, "content", "snippets"),
  aboutPath: path.resolve(__dirname, "content", "about.md"),
});

export const createResolvers = async (args: CreateResolversArgs) => {
  checkCreateComments(siteMetadata, args.reporter.panic);

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

export const createSchemaCustomization = async (
  args: CreateSchemaCustomizationArgs
) => {
  const { createTypes } = args.actions;
  createTypes(await localGql("./logicType.gql"));
};

export const createPages = async (args: CreatePagesArgs) => {
  // There are some fields in the gatsby remark plugin that are only lazily loaded at this point
  const allRemarks = await args.graphql<AllRemarkData>(
    await localGql("./fetchAllRemark.gql")
  );
  allRemarks.data?.allMarkdownRemark.edges.forEach((item) => {
    processor.transformRemarkNode(
      item.node,
      args.actions.createNode,
      args.createNodeId,
      args.createContentDigest
    );
  });

  // create passage pages
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
