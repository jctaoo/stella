---
targets:
  - '*'
root: false
description: Shadcn UI 组件规范与 MCP 使用指引（优先使用 shadcn MCP 获取信息与命令）
globs:
  - '**/*'
cursor:
  alwaysApply: true
  description: Shadcn UI 组件规范与 MCP 使用指引（优先使用 shadcn MCP 获取信息与命令）
  globs:
    - '**/*'
---
# Shadcn UI 组件使用与来源规则（MCP 增强）

本项目对 shadcn UI 的使用有强约束，且要求在涉及 shadcn 组件的任何任务时，**在必要的时候总是优先尝试使用 shadcn MCP 工具** 进行检索、命令生成与校验，再执行命令或实现代码。

## 基本规范

- **包管理器统一使用 pnpm**。
- **强制使用 CLI 管理组件**：`pnpm dlx shadcn@latest`
  - 添加：`pnpm dlx shadcn@latest add button input`
  - 覆盖更新：`pnpm dlx shadcn@latest add --overwrite button`
- **禁止**：
  - 手动在 `src/components/ui` 下创建、拷贝、粘贴、重命名组件文件。
  - 从文档/第三方仓库直接复制 shadcn 组件源码。
  - 通过脚手架/代码生成器绕过 `shadcn` CLI 生成组件。
- 已生成组件的修改：
  - 原则上不直接改动 `src/components/ui/*`。如需变更，优先修改 [components.json](mdc:components.json) 或通过 `add --overwrite` 重新生成。
  - 若必须本地化小范围样式，不能改变组件 API，并在提交中说明原因与范围。
- 目录与约定：
  - 组件根目录：`src/components/ui`
  - 不在其他目录重复放置 shadcn 组件。
- 代码评审检查：
  - PR 若新增/修改 `src/components/ui/*` 且非由 `pnpm dlx shadcn` 生成，应退回并改为通过 CLI 处理。
  - 确认组件清单与 [components.json](mdc:components.json) 一致。
- 提交信息建议：
  - `chore(shadcn): add button via shadcn CLI`
  - `chore(shadcn): update button via shadcn --overwrite`

## MCP 工具使用（务必优先尝试）

当需要查找、添加、更新、核对 shadcn 组件时，**先使用 shadcn MCP 工具** 获取信息与生成命令，再执行 CLI：

- 可用工具（按常见流程）：
  - `get_project_registries`：读取项目已配置的 shadcn registry。
  - `list_items_in_registries`：列出可用组件项（支持分页）。
  - `search_items_in_registries`：按名称/描述模糊搜索组件。
  - `view_items_in_registries`：查看组件的详细信息、文件清单与说明。
  - `get_item_examples_from_registries`：获取组件示例与完整用法代码。
  - `get_add_command_for_items`：根据所选组件生成准确的 `shadcn add` 命令。
  - `get_audit_checklist`：生成变更后的核对清单，确保新增/更新后无遗漏。

### 典型操作流程

- 添加组件：
  1) 使用 `search_items_in_registries` 定位组件 → 2) 用 `view_items_in_registries` 确认内容与依赖 → 3) 用 `get_add_command_for_items` 生成命令 → 4) 执行生成的 `pnpm dlx shadcn@latest add <items>`。

- 更新组件：
  1) 按上步骤检索 → 2) 使用 `get_add_command_for_items` 生成命令并添加 `--overwrite` → 3) 执行 `pnpm dlx shadcn@latest add --overwrite <items>`。

- 变更校验：
  - 运行 `get_audit_checklist`，并确保：
    - [components.json](mdc:components.json) 与实际组件文件一致；
    - 未直接手改 `src/components/ui/*`；
    - 依赖、样式、构建均正常。

### 执行约束与命令规范

- 运行命令统一使用 `pnpm`，禁止 `npm/yarn`。
- 执行时如需非交互，请添加对应的非交互参数（在自动化任务中务必考虑）。
- 组件覆盖更新必须使用 `--overwrite`，避免手工同步差异。

## 参考与对齐

- 组件清单与生成策略以 [components.json](mdc:components.json) 为准。
- 组件目录：`src/components/ui`（请勿在其他目录重复放置）。
- 出现与规则冲突的变更，应回滚并按 MCP + CLI 流程重新执行。

> 提示：本规则为“总是应用”。当任务与 shadcn 组件相关时，应首先尝试使用上列 **shadcn MCP** 工具完成检索和命令生成，再执行具体变更。
