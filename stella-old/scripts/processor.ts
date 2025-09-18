import * as path from "path";

import { Actions } from "gatsby";

import {
  BaseContentAbbr,
  BaseContentDetail,
  Tag,
} from "../src/models/base-content";
import { SnippetDetail } from "../src/models/snippet-content";

import { RemarkNode } from "./remarkNode";
import * as Utils from "./utils";

interface MarkdownProcessResult {
  markdown: string;
  abbr: BaseContentAbbr;
  detail: BaseContentDetail;
}

interface SnippetsProcessResult {
  tags: Tag[];
  category: string;
  detail: SnippetDetail;
}

export default class Processor {
  constructor({
    postsDir,
    snippetsDir,
    aboutPath,
  }: {
    postsDir: string;
    snippetsDir: string;
    aboutPath: string;
  }) {
    this.postsDir = postsDir;
    this.snippetsDir = snippetsDir;
    this.aboutPath = aboutPath;
  }

  private readonly postsDir: string;
  private readonly snippetsDir: string;
  private readonly aboutPath: string;

  private postTags: Set<Tag> = new Set();
  private postCategories: Set<string> = new Set();

  public async transformRemarkNode(
    node: RemarkNode,
    createNewNode: Actions["createNode"],
    createNodeId: (input: string) => string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    createContentDigest: (input: string | object) => string
  ) {
    if (node.fileAbsolutePath.includes(this.aboutPath)) {
      const result = await this.processRemarkNode(node);
      if (result) {
        createNewNode({
          ...result.detail,
          id: createNodeId(result.detail.item.identifier + "detail"),
          internal: {
            type: "About",
            contentDigest: createContentDigest(result.detail),
          },
        });
      }
      return;
    }

    const dir = path.dirname(node.fileAbsolutePath);
    const normalizedDir = path.join(dir, "/");

    if (normalizedDir.includes(this.postsDir)) {
      const result = await this.processRemarkNode(node);
      if (result) {
        createNewNode({
          ...result.detail.item,
          orderDate: result.detail.item.about.updateTimes[0],
          id: createNodeId(result.detail.item.identifier + "passage"),
          internal: {
            type: "Passage",
            contentDigest: createContentDigest(result.detail.item),
          },
        });
        createNewNode({
          ...result.detail,
          id: createNodeId(result.detail.item.identifier + "detail"),
          internal: {
            type: "PassageDetail",
            contentDigest: createContentDigest(result.detail),
          },
        });

        const tags = result.detail.item.about.tags ?? [];
        for (const tag of tags) {
          if (!this.postTags.has(tag)) {
            this.postTags.add(tag);
            createNewNode({
              ...tag,
              id: createNodeId(tag.id),
              internal: {
                type: "PostTag",
                contentDigest: createContentDigest(tag),
              },
            });
          }
        }

        const category = result.detail.item.about.category ?? "";
        if (!this.postCategories.has(category)) {
          this.postCategories.add(category);
          createNewNode({
            id: createNodeId(category),
            internal: {
              type: "PostCategory",
              contentDigest: createContentDigest(category),
              content: category,
            },
          });
        }
      }
    } else if (normalizedDir.includes(this.snippetsDir)) {
      const result = await this.processSnippet(node);
      if (result) {
        createNewNode({
          ...result.detail,
          orderDate: result.detail.item.about.updateTimes[0],
          id: createNodeId(result.detail.item.identifier + "detail"),
          internal: {
            type: "Snippet",
            contentDigest: createContentDigest(result.detail),
          },
        });
        result.tags.forEach((tag) => {
          createNewNode({
            ...tag,
            id: createNodeId(tag.id),
            internal: {
              type: "SnippetTag",
              contentDigest: createContentDigest(tag),
            },
          });
        });
        createNewNode({
          id: createNodeId(result.category),
          internal: {
            type: "SnippetCategory",
            contentDigest: createContentDigest(result.category),
            content: result.category,
          },
        });
      }
    }
  }

  private async processSnippet(
    remarkNode: RemarkNode
  ): Promise<SnippetsProcessResult | undefined> {
    const result = await this.processRemarkNode(remarkNode);

    if (result) {
      // details
      const detail: SnippetDetail = {
        content: result.detail.content,
        item: { ...result.detail.item },
        topImage: undefined, // TODO: 需要吗？
        circleImage: undefined,
      };

      return {
        tags: result.detail.item.about.tags ?? [],
        category: result.detail.item.about.category ?? "",
        detail: detail,
      };
    }

    return;
  }

  /**
   * 规范化文件的唯一 id
   * @param fileAbsolutePath 文件的绝对路径
   * @param userIdentifier 用户填写的 id
   * @param userTitle 用户填写的文件标题
   *
   * Conditions:
   * - has identifier defined by passage author: using identifier.
   * - hasn't user identifier but has passage title: using md5(title).
   * - Neither user identifier nor passage title: using file name.
   */
  private static normalizeIdentifier(
    fileAbsolutePath: string,
    userIdentifier?: string,
    userTitle?: string
  ): string {
    const extension = fileAbsolutePath.split(".").reverse()[0];
    const name = path.basename(fileAbsolutePath, extension);
    return userIdentifier ?? (userTitle ? Utils.toMD5(userTitle) : name);
  }

  private async processRemarkNode(
    node: RemarkNode
  ): Promise<Omit<MarkdownProcessResult, "abbr"> | undefined> {
    const tags = (node.frontmatter.tags ?? []).map((t) => ({
      id: Utils.toMD5(t),
      title: t,
    }));
    const identifier = Processor.normalizeIdentifier(
      node.fileAbsolutePath,
      node.frontmatter.identifier,
      node.frontmatter.title
    );
    return {
      markdown: node.rawMarkdownBody,
      detail: {
        item: {
          identifier: identifier,
          title: node.frontmatter.title ?? "",
          abbr: node.excerpt,
          about: {
            updateTimes: node.frontmatter.updateDates ?? [],
            tags: tags,
            category: node.frontmatter.category,
            readTime: node.timeToRead,
          },
        },
        content: node.html,
        topImage: node.frontmatter.topImage?.childImageSharp.gatsbyImageData,
        topImageAlt: node.frontmatter.topImageAlt,
        circleImage: node.frontmatter.circleImage?.publicURL,
      },
    };
  }
}
