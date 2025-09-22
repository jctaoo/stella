# Astro 开发与调研规则

- 当用户提出新增或修改 Astro 相关功能时，优先通过已配置的 Astro MCP 能力进行检索与方案生成；若不可用或结果不足，请在线搜索并参考最新的 Astro 官方文档、发布说明与社区最佳实践后再实施。

- 重点场景（包括但不限于）：
  - Server Islands / Islands 架构与部分水合策略
  - Prerender / 预渲染与静态生成（含按路由/页面粒度的设置）
  - View Transitions / 视图过渡

- 执行准则：
  - 在变更前先确认项目 Astro 版本（查看 `package.json` 与 `astro.config.mjs`），避免使用与版本不兼容的 API 或配置。
  - 以官方文档为准，优先参考最新版本文档与 Release Notes；必要时对比版本差异与迁移指南。
  - 在提交实现前，简要写明方案与影响面：涉及路由、构建目标、适配器或运行时行为的变更需特别说明。
  - 在 PR/提交信息中附上所依据的官方文档或权威来源链接以便复核。

- 建议的检索方式与关键词：
  - 使用 Astro MCP：查询目标功能的官方说明、API、示例与限制项。
  - 在线搜索关键词：`Astro <feature> docs`, `Astro islands best practices`, `Astro prerender static generation`, `Astro view transitions`, `Astro <current version> breaking changes`。

- 校验清单：
  - 本地 `dev` 与 `build` 通过，关键路由/页面按预期渲染（含预渲染页面与动态路由）。
  - 如改动 `astro.config.mjs`，验证适配器、输出目标与集成插件均工作正常。
  - 无新增的类型报错与 Lint 问题，站点导航/过渡交互在主流浏览器正常。

- 项目内相关位置参考：
  - 配置：`astro.config.mjs`
  - 页面与路由：`src/pages`
  - 布局：`src/layouts`
  - 组件：`src/components`
  - 静态资源：`public`

- 禁止：
  - 未经调研直接拍板实现；直接复制过时教程代码；忽略当前版本兼容性与迁移指引。