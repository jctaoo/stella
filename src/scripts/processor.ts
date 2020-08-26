import { MarkdownInfo } from "../models/markdown-info";
import * as Utils from "./utils";
import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as path from "path";
import * as UUID from "uuid";
import YAML from "yaml";
import { PassageAbbr, PassageDetail } from "../models/passage-content";
import { BaseContentAbbr, BaseContentDetail, Tag } from "../models/base-content";
import { SnippetAbbr } from "../models/snippet-content";

interface MarkdownProcessResult {
  information: MarkdownInfo
  markdown: string
  abbr: BaseContentAbbr,
  detail: BaseContentDetail,
}

interface PostsProcessResult {
  tags: Tag[]
  categories: string[]
  details: PassageDetail[]
  abbrs: PassageAbbr[]
}

export default class Processor {

  constructor({ publicDir, imageStaticDir, postsDir, snippetsDir, aboutDir }: { publicDir: string, imageStaticDir: string, postsDir: string, snippetsDir: string, aboutDir: string }) {
    this.publicDir = publicDir;
    this.imageStaticDir = imageStaticDir;
    this.postsDir = postsDir;
    this.snippetsDir = snippetsDir;
    this.aboutDir = aboutDir;
  }

  // ==================== Properties ====================

  private publicDir: string;
  private imageStaticDir: string;
  private postsDir: string;
  private snippetsDir: string;
  private aboutDir: string;

  private markdownImageRegx = /!\[([^\]]+)\]\(([^\)]+)\)/g;
  private markdownLinkRegx = /\[(.*?)\]\((.*?)\)/g;
  private markdownYamlRegx = /^---\n([\s\S]*?)---\n{0,1}/;
  private codeSnippetRegx = /```.*?\n[\s\S]*?```\n{0,1}/;

  /** 图片缓存, 避免重新复制图片/下载图片 */
  private imageSymbolToTargetPath: Map<string, string> = new Map();

  // ==================== 处理流程 ====================

  public async processAbout(): Promise<PassageDetail | null> {
    const result = await this.processMarkdown(this.aboutDir);
    return result?.detail ?? null;
  }

  public async processPosts(): Promise<PostsProcessResult> {
    const childs = await fs.promises.readdir(this.postsDir);

    let tags: Tag[] = [];
    let categories: string[] = [];
    let abbrs: PassageAbbr[] = [];
    let details: PassageDetail[] = [];

    for (const childPath of childs) {
      const result = await this.processMarkdown(path.resolve(this.postsDir, childPath));
      if (!!result) {
        tags = tags.concat(result.abbr.about.tags ?? []);
        categories.push(result.abbr.about.category ?? "");
        abbrs.push(result.abbr);
        details.push(result.detail);
      }
    }
    tags = Array.from(new Set(tags));
    categories = Array.from(new Set(categories));
    abbrs.sort((lhs, rhs) => {
      return rhs.about.updateTimes[0].getTime() - lhs.about.updateTimes[0].getTime()
    });
    return {
      tags,
      categories: categories.filter(c => c !== ""),
      abbrs,
      details,
    }
  }

  public async processSnippets(): Promise<SnippetAbbr[]> {

    const childs = await fs.promises.readdir(this.snippetsDir);

    let abbrs: SnippetAbbr[] = [];

    for (const childPath of childs) {
      const result = await this.processMarkdown(path.resolve(this.snippetsDir, childPath));
      if (!!result) {
        const codeMatchResult = result.markdown.match(this.codeSnippetRegx);
        const codeRaw = !!codeMatchResult ? codeMatchResult[0] : undefined;
        const abbr = !!codeMatchResult ? result.markdown.slice((codeMatchResult.index ?? 0) + codeMatchResult[0].length) : result.markdown;
        abbrs.push({ ...result.abbr, abbr, codeRaw });
      }
    }

    abbrs.sort((lhs, rhs) => {
      return rhs.about.updateTimes[0].getTime() - lhs.about.updateTimes[0].getTime()
    });
    return abbrs
  }

  // ==================== 预处理流程 ====================

  /**
   * 清理 public 中的图片资源文件夹
   */
  public async clearAndEnsureImageFolder() {
    await Utils.ensureFolder(this.imageStaticDir);
    if (fs.existsSync(this.imageStaticDir)) {
      fsExtra.removeSync(this.imageStaticDir);
    }
    await Utils.ensureFolder(this.imageStaticDir);
  }

  // ==================== 规范化流程 ====================

  /**
   * 规范化文件的唯一 id
   * @param fileAbsolutePath 文件的绝对路径
   * @param userIdentifier 用户填写的 id
   * @param userTitle 用户填写的文件标题
   */
  private normalizeIdentifier(fileAbsolutePath: string, userIdentifier?: string, userTitle?: string): string {
    const extension = fileAbsolutePath.split(".").reverse()[0]
    const name = path.basename(fileAbsolutePath, extension);
    return userIdentifier ?? (!!userTitle ? Utils.toMD5(userTitle) : name);
  }

  /**
   * 规范化图片链接 
   * @param link 原图片链接
   * @param filePath 原文件的绝对路径
   */
  private async normalizeImageLink(link: string, filePath: string): Promise<string> {
    // 读取缓存的链接
    const cache = this.imageSymbolToTargetPath.get(link);
    if (!!cache) {
      return cache;
    }

    const cacheLink = (targetPath: string = link) => {
      this.imageSymbolToTargetPath.set(link, targetPath);
    };

    // 如果是 web url, 下载图片
    if (Utils.isUrl(link)) {
      const imageName = `${UUID.v4()}.png`;
      const imageDestination = path.resolve(this.imageStaticDir, imageName);
      try {
        await Utils.downloadImage(link, imageDestination);
        const publicPath = imageDestination.replace(this.publicDir, "");
        cacheLink(publicPath);
        return publicPath;
      } catch (error) {
        // PASS
      }
    }

    // 如果本地存在该图片
    const linkPath = path.resolve(filePath, "..", link);
    if (fs.existsSync(linkPath)) {
      const extension = linkPath.split(".").reverse()[0] ?? "png";
      const imageName = UUID.v4() + "." + extension;
      const imageDestinationPath = path.resolve(this.imageStaticDir, imageName);
      await fs.promises.copyFile(linkPath, imageDestinationPath);
      const publicPath = imageDestinationPath.replace(this.publicDir, "");
      cacheLink(publicPath);
      return publicPath;
    }

    // 在不满足以上条件的情况下返回原链接
    cacheLink();
    return link;
  }

  /**
   * 规范化链接
   * @param link 原链接
   * @param filePath 原文件的绝对路径
   */
  // TODO 实现文件链接
  private async normalizeLink(link: string, filePath: string): Promise<string> {
    // 如果是 web url 不做修改
    if (Utils.isUrl(link)) {
      return link;
    }

    // 如果是本地文件之间的引用
    const linkPath = path.resolve(filePath, "..", link);
    if (fs.existsSync(linkPath)) {
      // TODO 不要重复读取文件
      const content = (await fs.promises.readFile(linkPath)).toString();
      const idntifierMatch = /identifier:\s(.*)/.exec(content);
      const titleMatch = /title:\S(.*)/.exec(content);
      const identifier = this.normalizeIdentifier(
        filePath,
        !!idntifierMatch ? idntifierMatch[1] : undefined,
        !!titleMatch ? titleMatch[1] : undefined,
      );
      return "/passage/" + identifier;
    }

    // 如果不满足以上条件, 直接返回
    return link;
  }

  /**
   * 规范化 markdown 字符串
   * @param markdown markdown 内容
   * @param filePath markdown 文件的绝对路径
   * @returns 规范化的 markdown 字符串
   */
  private async normalizeMarkdown(markdown: string, filePath: string): Promise<string> {

    let resultString = markdown;

    // 处理图片链接
    // /!\[([^\]]+)\]\(([^\)]+)\)/ 
    // [0]: markdown image name
    // [1]: markdown image link
    resultString = await Utils.replaceAsync(
      resultString,
      this.markdownImageRegx,
      async (_matchString: string, imageName: string, imageLink: string, _index: number, _input: string): Promise<string> => {
        const normalizedImageLink = await this.normalizeImageLink(imageLink, filePath);
        return `![${imageName}](${normalizedImageLink})`;
      }
    );

    // 处理链接
    // /\[(.*?)\]\((.*?)\)/
    // [0]: markdown link name
    // [1]: markodnw link href
    resultString = await Utils.replaceAsync(
      resultString,
      this.markdownLinkRegx,
      async (matchString: string, linkName: string, linkHref: string, index: number, input: string): Promise<string> => {
        // 判断不是图片
        const previousIndex = Math.max(0, index - 1)
        if (input[previousIndex] !== "!") {
          const normalizedLinkHref = await this.normalizeLink(linkHref, filePath);
          return `[${linkName}](${normalizedLinkHref})`;
        }

        return matchString;
      }
    );

    return resultString;
  }

  // ==================== 通用处理流程 ====================

  /**
   * 处理 markdown 文件并返回处理结果
   * @param absolutePath markdown 文件的绝对路径
   */
  private async processMarkdown(absolutePath: string): Promise<MarkdownProcessResult | undefined> {
    // 意外情况处理
    if (!fs.existsSync(absolutePath)) {
      return;
    }
    const extension: string | undefined = absolutePath.split(".").reverse()[0]
    const stat = await fs.promises.stat(absolutePath);
    if (!stat.isFile() || !extension || (!!extension && extension !== "md")) {
      return;
    }

    // 开始正式处理
    const name = path.basename(absolutePath, extension);
    const buffer = await fs.promises.readFile(absolutePath);
    const content = await this.normalizeMarkdown(buffer.toString(), absolutePath);

    let makdwonInformation: MarkdownInfo = {
      title: name,
    };
    let markdown = content;

    // 匹配 yaml 内容
    // /^---\n([\s\S]*?)---\n{0,1}/
    // [0]: yaml string
    const yamlMatchResult = content.match(this.markdownYamlRegx);
    if (!!yamlMatchResult) {
      const yaml: MarkdownInfo = YAML.parse(yamlMatchResult[1]);
      makdwonInformation = yaml;
      markdown = content.slice((yamlMatchResult?.index ?? 0) + yamlMatchResult[0].length);
    }

    // 处理并产生结结果
    const identifier = this.normalizeIdentifier(absolutePath, makdwonInformation.identifier, makdwonInformation.title);

    const abbr: BaseContentAbbr = {
      identifier: identifier,
      title: makdwonInformation.title,
      abbr: makdwonInformation.abbr ?? "",
      about: {
        updateTimes: (makdwonInformation.updateDates ?? []).map(d => new Date(d)),
        tags: (makdwonInformation.tags ?? []).map(t => ({ id: Utils.toMD5(t), title: t })),
        category: makdwonInformation.category ?? "",
        readTime: Utils.calculateReadingTimeFromMarkdown(markdown),
      }
    }
    const detail: BaseContentDetail = {
      item: abbr,
      content: markdown,
      topImage: makdwonInformation.topImage ?? "",
      circleImage: makdwonInformation.circleImage ?? "",
    }

    return {
      information: makdwonInformation,
      markdown,
      abbr,
      detail,
    }
  }

}