import { CreatePagesArgs, CreateResolversArgs, CreateSchemaCustomizationArgs, SourceNodesArgs } from "gatsby";
import * as path from "path";
import { PassageAbbr } from "./src/models/passage-content";
import { NodeData } from "./src/models/node-data";
import config from "./gatsby-config";
import Processer from "./src/scripts/processor";
import typeDefs from "./src/scripts/schema";

// TODO 链接中的图片无法点击, 无居中
// TODO 每次相同的图片生成的图片路径不一样
// TODO 优化 markdown yaml 的空字段
// TODO discus 拼错了 ---> disqus
// TODO 将 markdown 翻译 html 在 准备阶段执行

interface CreatePagesData {
  allPassage: NodeData<PassageAbbr>
}

const processer = new Processer({
  publicDir: path.resolve(__dirname, "public"),
  imageStaticDir: path.resolve(__dirname, "public", "static", "images"),
  postsDir: path.resolve(__dirname, "content", "posts"),
  snippetsDir: path.resolve(__dirname, "content", "snippets"),
  aboutDir: path.resolve(__dirname, "content", "about.md")
});

export const createResolvers = async (args: CreateResolversArgs) => {
  const about = await processer.processAbout();
  const resolvers = {
    Query: {
      about: {
        type: 'ContentDetail',
        resolve: (source: any, args: any, context: any, info: any) => {
          return about;
        }
      },
    }
  }
  args.createResolvers(resolvers)
}

export const createSchemaCustomization = async (args: CreateSchemaCustomizationArgs) => {
  const { createTypes } = args.actions;
  createTypes(typeDefs);
}

export const sourceNodes = async (args: SourceNodesArgs) => {
  await processer.clearAndEnsureImageFolder();

  // 添加 siteMetadata 节点
  const siteMetadata: any | undefined = config.siteMetadata;
  args.actions.createNode({
    config: {
      siteName: siteMetadata?.config?.siteName ?? siteMetadata?.title ?? "",
      homeLargeTitle: siteMetadata?.config?.homeLargeTitle ?? "",
      discus: {
        shortName: siteMetadata?.config?.discus?.shortName ?? ""
      },
    },
    routeConfigurations: {
      about: { title: siteMetadata?.routeConfigurations?.about?.title ?? "" },
      passages: { title: siteMetadata?.routeConfigurations?.passages?.title ?? "" },
      snippets: { title: siteMetadata?.routeConfigurations?.snippets?.title ?? "" },
    },
    medias: (!!siteMetadata?.medias && Array.isArray(siteMetadata?.medias)) ? (siteMetadata.medias as any[]).map(t => ({
      identifier: t.identifier ?? "",
      iconName: t.iconName ?? "",
      title: t.title ?? "",
      link: t.link ?? "",
      imageName: t.imageName ?? "",
    })) : [],
    id: args.createNodeId("SiteMetadata"),
    internal: {
      type: "SiteMetadata",
      contentDigest: args.createContentDigest(siteMetadata)
    }
  });

  // 添加 posts
  const posts = await processer.processPosts();

  posts.tags.forEach(tag => {
    args.actions.createNode({
      ...tag,
      id: args.createNodeId(tag.id),
      internal: {
        type: 'Tag',
        contentDigest: args.createContentDigest(tag)
      }
    });
  });
  posts.categories.forEach(category => {
    args.actions.createNode({
      id: args.createNodeId(category),
      internal: {
        type: 'Category',
        contentDigest: args.createContentDigest(category),
        content: category,
      }
    });
  })
  posts.abbrs.forEach(abbr => {
    args.actions.createNode({
      ...abbr,
      id: args.createNodeId(abbr.identifier + "passage"),
      internal: {
        type: 'Passage',
        contentDigest: args.createContentDigest(abbr),
      }
    });
  });
  posts.details.forEach(detail => {
    args.actions.createNode({
      ...detail,
      id: args.createNodeId(detail.item.identifier + "detail"),
      internal: {
        type: 'PassageDetail',
        contentDigest: args.createContentDigest(detail),
      }
    });
  });

  // 添加 snippets
  const snippets = await processer.processSnippets();

  snippets.forEach(snippet => {
    args.actions.createNode({
      ...snippet,
      id: args.createNodeId(snippet.identifier + "snippet"),
      internal: {
        type: 'Snippet',
        contentDigest: args.createContentDigest(snippet),
      }
    });
  });

}

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
  `)
  result.data?.allPassage.edges.forEach(item => {
    args.actions.createPage({
      path: `/passage/${item.node.identifier}`,
      component: path.resolve(__dirname, 'src', 'templates', 'passage', 'passage.tsx'),
      context: {
        identifier: item.node.identifier,
      }
    });
  });
}
