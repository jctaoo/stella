Please also reference the following documents as needed. In this case, `@` stands for the project root directory.

<Documents>
  <Document>
    <Path>@.codex\memories\astro-development.md</Path>
    <FilePatterns>**/*</FilePatterns>
  </Document>
  <Document>
    <Path>@.codex\memories\content-authoring.md</Path>
    <Description>Content authoring rules aligned with src/content.config.ts schemas</Description>
    <FilePatterns>src/content/**/*.md, src/content/**/*.mdx</FilePatterns>
  </Document>
  <Document>
    <Path>@.codex\memories\shadcn-components.md</Path>
    <Description>Shadcn UI 组件规范与 MCP 使用指引（优先使用 shadcn MCP 获取信息与命令）</Description>
    <FilePatterns>**/*</FilePatterns>
  </Document>
  <Document>
    <Path>@.codex\memories\site-config.md</Path>
    <Description>站点配置中心化（src/siteConfig.ts）与避免硬编码的约定</Description>
    <FilePatterns>**/*</FilePatterns>
  </Document>
</Documents>

# Additional Conventions Beyond the Built-in Functions

As this project's AI coding tool, you must follow the additional conventions below, in addition to the built-in functions.# 项目结构与开发约定（Stella / Astro）

- 包管理器：必须使用 pnpm（见 [package.json](mdc:package.json) 中 `packageManager` 字段）。
  - 安装依赖：`pnpm install`
  - 本地开发：`pnpm dev`
  - 构建产物：`pnpm build`
  - 本地预览：`pnpm preview`

## 关键配置与入口
- Astro 配置：[astro.config.mjs](mdc:astro.config.mjs)
- 包与脚本：[package.json](mdc:package.json)
- TypeScript 配置：[tsconfig.json](mdc:tsconfig.json)

## 目录总览（./src）
- 组件：`src/components`（通用组件与 `ui/` 下的 shadcn 组件）
- 内容集合：`src/content`（Markdown/资产内容）
- 内容模型定义：[src/content.config.ts](mdc:src/content.config.ts)
- 布局：`src/layouts`（`main.astro`、`pages.astro`、`article.astro`）
- 路由页面：`src/pages`（基于文件系统路由）
- 样式：`src/styles`（`global.css`）
- 工具库：`src/utils`、`src/lib`
- 自定义插件：`plugin/`（`remark-modified-time.ts`、`remark-reading-time.ts`）
- 静态资源：`public/`

## 基础路由（基于 src/pages）
- `/` → [src/pages/index.astro](mdc:src/pages/index.astro)
- `/about` → [src/pages/about.mdx](mdc:src/pages/about.mdx)
- `/posts` 列表 → [src/pages/posts/index.astro](mdc:src/pages/posts/index.astro)
- `/posts/:slug...` 详情（动态） → [src/pages/posts/[...slug].astro](mdc:src/pages/posts/[...slug].astro)
- `/snippets` 列表 → [src/pages/snippets/index.astro](mdc:src/pages/snippets/index.astro)
- `/snippets/:slug...` 详情（动态） → [src/pages/snippets/[...slug].astro](mdc:src/pages/snippets/[...slug].astro)

## 内容组织（src/content）
- 文章集合：`src/content/posts`（含 `.md` 与配图等资产）
- 片段集合：`src/content/snippets`
- 集合/字段等规范在 [src/content.config.ts](mdc:src/content.config.ts) 中定义与校验。

## shadcn 组件使用
- 严格遵循规则见：[shadcn-components.mdc](mdc:shadcn-components.mdc)

## Astro 研发流程
- 新增 Astro 能力时遵循：[astro-development.mdc](mdc:astro-development.mdc)

## 其他约定
- 禁止使用 npm/yarn 进行安装与脚本执行；统一使用 pnpm。
- 代码格式：使用 Prettier；修复命令：`pnpm run fix:prettier`。