import { CreatePagesArgs, CreateResolversArgs, CreateSchemaCustomizationArgs, SourceNodesArgs } from "gatsby";
import * as fs from "fs";
import * as path from "path";
import YAML from "yaml";
import { PassageAbbr, PassageDetail } from "./src/models/passage-content";
import crypto from "crypto";
import { MarkdownInfo } from "./src/models/markdown-info";
import { Tag } from "./src/models/base-content";
import { NodeData } from "./src/models/node-data";
import { SnippetAbbr } from "./src/models/snippet-content";

const calculateReadingTimeFromMarkdown = (markdown: string): number => {
  const WORDS_PER_MINUTE = 200;
  const regex=/\w+/g;
  return Math.ceil(markdown.match(regex)?.length ?? 0 / WORDS_PER_MINUTE) * 1000;
}

const toMD5 = (arg: string): string => {
  const hash = crypto.createHash("md5");
  return hash.update(arg).digest("hex");
};

// #TODO 将 markdown 翻译 html 在 准备阶段执行

export const createResolvers = async (args: CreateResolversArgs) => {
  // #TODO 基于 Gatsby Node 构建
  const resolvers = {
    Query: {
      about: {
        type: ['ContentDetail'],
        resolve: (source: any, args: any, context: any, info: any) => {
          return null
        }
      },
    }
  }
  args.createResolvers(resolvers)
}

export const createSchemaCustomization = async (args: CreateSchemaCustomizationArgs) => {
  const { createTypes } = args.actions;
  const typeDefs = `
    type ContentDetail {
      item: ContentAbbr!
      content: String!
      topImage: String
      circleImage: String
    }
    type ContentAbbr {
      identifier: String!
      title: String!
      abbr: String
      about: About!
      codeRaw: String
    }
    type About {
      updateTimes: [Date!]!
      tags: [Tag!]!
      category: String
      readTime: Int
    }
  `;
  createTypes(typeDefs);
}

export const sourceNodes = async (args: SourceNodesArgs) => {

  const yamlRegx = /^---\n([\s\S]*?)---\n{0,1}/;
  const codeSnippetRegx = /```.*?\n[\s\S]*?```\n{0,1}/;

  // read posts
  const baseDir = path.resolve(__dirname, "content", "posts")
  const dir = await fs.promises.readdir(baseDir);

  const abbrs: PassageAbbr[] = [];
  const details: PassageDetail[] = [];
  let tags: Tag[] = [];
  let categories: string[] = [];

  for (const name of dir) {
    const item = await fs.promises.readFile(path.resolve(baseDir, name));
    const stat = await fs.promises.stat(path.resolve(baseDir, name));

    const content = item.toString();
    const matchResult = content.match(yamlRegx);
    if (matchResult) {
      const yaml: MarkdownInfo = YAML.parse(matchResult[1]);
      const markdown = content.slice((matchResult.index ?? 0) + matchResult[0].length);
      let abbr = yaml.abbr;
      let markdownContent = markdown;
      let identifier = yaml.identifier ?? toMD5(yaml.title);
      // # TODO 实现多 updateTimes
      const passageAbbr: PassageAbbr = {
        identifier: identifier,
        title: yaml.title,
        abbr: abbr,
        about: {
          updateTimes: [stat.mtime],
          tags: yaml.tags.map(t => ({ id: toMD5(t), title: t })),
          category: yaml.category,
          readTime: calculateReadingTimeFromMarkdown(markdownContent),
        }
      }
      // # TODO 完善空字段处理 https://github.com/gatsbyjs/gatsby/issues/6800
      const passageDetail: PassageDetail = {
        item: passageAbbr,
        content: markdownContent,
        topImage: yaml.topImage ?? "",
        circleImage: yaml.circleImage ?? "",
      }
      abbrs.push(passageAbbr);
      details.push(passageDetail);
      tags = tags.concat(passageAbbr.about.tags);
      if (passageAbbr.about.category) {
        categories.push(passageAbbr.about.category);
      }
    }
  }

  tags = Array.from(new Set(tags));
  categories = Array.from(new Set(categories));

  tags.forEach(tag => {
    args.actions.createNode({
      ...tag,
      id: args.createNodeId(tag.id),
      internal: {
        type: 'Tag',
        contentDigest: args.createContentDigest(tag)
      }
    });
  });
  categories.forEach(category => {
    args.actions.createNode({
      id: args.createNodeId(category),
      internal: {
        type: 'Category',
        contentDigest: args.createContentDigest(category),
        content: category,
      }
    });
  })
  abbrs.forEach(abbr => {
    args.actions.createNode({
      ...abbr,
      id: args.createNodeId(abbr.identifier + "passage"),
      internal: {
        type: 'Passage',
        contentDigest: args.createContentDigest(abbr),
      }
    });
  });
  details.forEach(detail => {
    args.actions.createNode({
      ...detail,
      id: args.createNodeId(detail.item.identifier + "detail"),
      internal: {
        type: 'PassageDetail',
        contentDigest: args.createContentDigest(detail),
      }
    });
  });

  // read snippets
  const snippetsDirName = path.resolve(__dirname, "content", "snippets")
  const snippetsDir = await fs.promises.readdir(snippetsDirName);

  const snippets: SnippetAbbr[] = [];

  for (const item of snippetsDir) {
    const content = (await fs.promises.readFile(path.resolve(snippetsDirName, item))).toString();
    const stat = await fs.promises.stat(path.resolve(snippetsDirName, item));

    const matchResult = content.match(yamlRegx);
    const codeMatchResult = content.match(codeSnippetRegx);

    if (matchResult && codeMatchResult) {
      const yaml: MarkdownInfo = YAML.parse(matchResult[1]);
      const codeSnippet = codeMatchResult[0];
      const abbr = content.slice((codeMatchResult.index ?? 0) + codeMatchResult[0].length);

      let identifier = yaml.identifier ?? toMD5(yaml.title);
      // # TODO 实现多 updateTimes
      const snippet: SnippetAbbr = {
        identifier: identifier,
        title: yaml.title,
        abbr: abbr,
        codeRaw: codeSnippet,
        about: {
          updateTimes: [stat.mtime],
          tags: yaml.tags.map(t => ({ id: toMD5(t), title: t })),
          category: yaml.category,
        }
      }
      snippets.push(snippet);
    }
  }

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

interface CreatePagesData {
  allPassage: NodeData<PassageAbbr>
}

export const createPages = async (args: CreatePagesArgs) => {
  const result = await args.graphql<CreatePagesData>(`
    {
      allPassage {
        edges {
          node {
            identifier
            title
            abbr
            about {
              updateTimes
              tags {
                id
                title
              }
              category
              readTime
            }
          }
        }
      }
    }
  `)
  console.log(result)
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


