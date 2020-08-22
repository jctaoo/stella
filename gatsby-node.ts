import { CreateResolversArgs, CreateSchemaCustomizationArgs } from "gatsby";
import marked from "marked";
import Katex from "katex";
import * as Highlight from "highlight.js";
import * as fs from "fs";
import * as path from "path";
import YAML from "yaml";
import { PassageAbbr, PassageDetail } from "./src/models/passage-content";
import crypto from "crypto";
import { MarkdownInfo } from "./src/models/markdown-info";
import { Tag } from "./src/models/base-content";

export const createResolvers = async (args: CreateResolversArgs) => {
  const baseDir = path.resolve(__dirname, "content", "posts")
  const dir = await fs.promises.readdir(baseDir);
  const moreSymbol = "<--- more --->"

  const abbrs: PassageAbbr[] = [];
  const details: PassageDetail[] = [];
  let tags: Tag[] = [];
  let categories: string[] = [];

  for (const name of dir) {
    const item = await fs.promises.readFile(path.resolve(baseDir, name));
    const stat = await fs.promises.stat(path.resolve(baseDir, name));

    const content = item.toString();
    const regx = /^---\n([\s\S]*?)---\n/;
    const matchResult = content.match(regx);
    if (matchResult) {
      const yaml: MarkdownInfo = YAML.parse(matchResult[1]);
      const markdown = content.slice((matchResult.index ?? 0) + matchResult[0].length);
      let abbr: string | undefined = undefined;
      let markdownContent = markdown;
      let identifier = yaml.identifier ?? toMD5(yaml.title);
      if (markdown.includes(moreSymbol)) {
        abbr = markdown.split(moreSymbol)[0];
        markdownContent = markdown.split(moreSymbol)[1];
      }
      // # TODO 实现多 updateTimes
      const passageAbbr: PassageAbbr = {
        identifier: identifier,
        title: yaml.title,
        abbr: abbr,
        about: {
          updateTimes: [stat.mtime],
          tags: yaml.tags.map(t => ({ id: toMD5(t), title: t })),
          category: yaml.category,
          readTime: 1000 * 100 * 60,
        }
      }
      const passageDetail: PassageDetail = {
        item: passageAbbr,
        content: markdownContent,
        topImage: yaml.topImage,
        circleImage: yaml.circleImage,
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

  const resolvers = {
    Query: {
      allPassagesDetail: {
        type: ['ContentDetail'],
        resolve: (source: any, args: any, context: any, info: any) => {
          return details;
        }
      },
      allPassages: {
        type: ['ContentAbbr'],
        resolve: async (source: any, args: any, context: any, info: any) => {
          return abbrs;
        }
      },
      about: {
        type: ['ContentDetail'],
        resolve: (source: any, args: any, context: any, info: any) => {
          return null
        }
      },
      allTags: {
        type: ['Tag'],
        resolve: (source: any, args: any, context: any, info: any) => {
          return tags;
        }
      },
      allCategories: {
        type: ['String'],
        resolve: (source: any, args: any, context: any, info: any) => {
          return categories;
        }
      },
      allSnippets: {
        type: ['ContentAbbr'],
        resolve: (source: any, args: any, context: any, info: any) => {
          return [

          ]
        }
      }
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
    type Tag {
      id: String!
      title: String!
    }
    type SocialMedia {
      identifier: String!
      iconName: String!
      title: String!
      link: String
      imageName: String
    }
  `;
  createTypes(typeDefs);
}

const toMD5 = (arg: string): string => {
  const hash = crypto.createHash("md5");
  return hash.update(arg).digest("hex");
};

const configMarked = () => {
  marked.setOptions({
    breaks: true,
    gfm: true,
  })
  marked.use({
    // @ts-ignore
    renderer: {
      // @ts-ignore
      listitem(text, task) {
        if (task) {
          return `<li class="task-list-item">${text}</li>\n`;
        }
        // use original renderer
        return false;
      },
      // @ts-ignore
      paragraph(text: string) {
        if (text.trim().startsWith("$$") && text.trim().endsWith("$$")) {
          let raw = text.trim();
          raw = raw.slice(2, raw.length - 2);
          const result = Katex.renderToString(raw, {throwOnError: false});
          return `<span class="latex">${result}</span>`;
        }
        return false;
      },
      code(code, language) {
        const container = document.createElement('div');
        container.className = "code-container";

        const coloredBlock = document.createElement('div');
        coloredBlock.className = "colored-block"

        const lineBlock = document.createElement('div');
        lineBlock.className = "code-lines-block";

        const lines = code.split('\n');
        const newLines: string[] = [];
        const countOfLines = lines.length;
        for (let i = 0; i < countOfLines; i ++) {
          const line = lines[i];

          const numberBlock = document.createElement('span');
          numberBlock.innerText = (i + 1).toString();
          numberBlock.className = "code-lines-block-item hljs-comment";

          const coloredItemBlock = document.createElement('span');
          let newline = line;
          const isAdd = line.startsWith('+');
          const isDelete = line.startsWith('-');
          if (isAdd || isDelete) {
            coloredItemBlock.className = `colored-block-item colored-block-item-colored-${isAdd ? "add" : "delete"}`;
            newline = ' ' + newline.slice(1, newline.length);
          } else {
            coloredItemBlock.className = "colored-block-item";
          }
          newLines.push(newline);

          coloredBlock.appendChild(coloredItemBlock);
          lineBlock.appendChild(numberBlock);
        }
        const newCode = newLines.join("\n");

        container.appendChild(lineBlock);

        const preEle = document.createElement('pre');
        let codeEle = document.createElement('code');
        if (language) {
          codeEle.className = "language-" + language
        }
        preEle.appendChild(codeEle);
        codeEle.innerHTML = newCode;
        Highlight.highlightBlock(preEle);
        codeEle = preEle.firstChild! as HTMLElement;

        container.appendChild(codeEle);

        const newPreEle = document.createElement('pre');
        newPreEle.className = preEle.className;

        newPreEle.appendChild(coloredBlock);
        newPreEle.appendChild(container);

        return newPreEle.outerHTML;
      },
      table(header: string, body: string) {
        const bodyRows = body.split("<tr>").filter((t) => t !== "")
        const oddClassName = "body-odd-row"
        const evenClassName = "body-even-row"
        const newBody = bodyRows.map((i, index) => {
          const rowString = "<tr>" + i
          if (index % 2 === 0) {
            return rowString.slice(0, 3) + ` class="${evenClassName}"` + rowString.slice(3)
          } else {
            return rowString.slice(0, 3) + ` class="${oddClassName}"` + rowString.slice(3)
          }
        }).join()
        return `<table>${header + newBody}</table>`;
      }
    }
  });
}