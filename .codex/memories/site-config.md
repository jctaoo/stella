## 目的

统一在 [src/siteConfig.ts](mdc:src/siteConfig.ts) 中集中定义站点层级的所有可配置项（展示文案、开关、元信息、链接等），通过类型与校验保障一致性，避免在页面/布局/组件中出现硬编码，提升全站可配置性与可维护性。

## 强制要求（必须遵守）

- 所有站点级配置项必须定义在 `siteConfigSchema` 中，并通过 `siteConfig` 导出后被消费。
- 在 `.astro`、`.tsx`、`.ts` 中引用配置时，统一使用路径别名导入：

```ts
import { siteConfig, type SiteConfig } from "@/siteConfig";
```

- 禁止在 `src/pages`、`src/layouts`、`src/components` 等目录中直接硬编码站点名称、描述、社交链接、默认标题/描述、主题缺省、版权/许可、分析 ID、RSS/Feed 开关等。
- 新增/变更配置项时：
  - 同步更新 `siteConfigSchema`（使用 `z` 添加类型与 `.describe()` 描述）；
  - 给出合理默认值（`.default(...)`）或明确 `optional()` 并在使用端处理兜底；
  - 仅从 `siteConfig` 使用，不绕过类型直接访问未声明字段。
- 仅在需要修改/扩展配置模型时才导入 `siteConfigSchema`；业务使用端不得依赖或修改 schema。

## 新增配置项规范

在 [src/siteConfig.ts](mdc:src/siteConfig.ts) 中：

```ts
import { z } from "astro:schema";

const siteConfigSchema = z.object({
  siteName: z.string().describe("站点名称").default("Jctaoo."),
  bannerText: z.string().describe("横幅文案").optional(),

  // 示例：新增字段请提供类型、描述与默认值或 optional
  description: z.string().describe("默认站点描述").default("A modern Astro site"),
  baseUrl: z.string().url().describe("站点基础 URL（不含末尾斜杠）").optional(),
  defaultTheme: z.enum(["system", "light", "dark"]).describe("默认主题").default("system"),
  social: z
    .object({ github: z.string().url().optional(), twitter: z.string().url().optional() })
    .default({}),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

export const siteConfig = siteConfigSchema.parse({
  // 在此集中覆写实际值；缺省项走默认值
  bannerText: "This is a demo site.",
  description: "A modern Astro site",
  defaultTheme: "system",
  social: { github: "https://github.com/your/repo" },
});
```

规范要点：

- 为每个新字段写清 `.describe()`，便于后续维护与自动文档化。
- 能给默认值就给默认值；不可给出合理默认的字段才标记为 `optional()`。
- 需要从环境变量读取的敏感信息（如 API Key）仍应置于 `import.meta.env.*`，但“是否启用”之类的站点级开关可进入 `siteConfig`。

## 使用示例

- 在 `.astro` 中使用：

```astro
---
import { siteConfig } from "@/siteConfig";
const title = siteConfig.siteName;
const banner = siteConfig.bannerText ?? "";
---
<h1>{title}</h1>
{banner && <p>{banner}</p>}
```

- 在 `tsx` 组件中使用：

```tsx
import { siteConfig } from "@/siteConfig";

export function HeaderTitle() {
  return <span>{siteConfig.siteName}</span>;
}
```

## 典型适用范围（必须走配置）

- 站点名称、描述、副标题、版权与许可、社交链接、页脚/页眉文案
- 默认 SEO 元信息与分享图、标题模板
- 主题默认值、是否展示 banner、UI 显示/隐藏开关
- RSS/Feed 是否开启、条数限制等
- 第三方分析/脚本开关与标识（非密钥）

## 违例与迁移指引

- 若发现硬编码的站点文案/链接/标题模板/开关：
  1) 在 `siteConfigSchema` 中新增字段并赋默认值；
  2) 在 `siteConfig.parse({...})` 中填充项目实际值；
  3) 将使用处替换为 `siteConfig.<key>` 引用。

## 评审检查清单（PR Reviewer）

- 新增或更改站点级文案/开关是否进入了 [src/siteConfig.ts](mdc:src/siteConfig.ts)？
- 是否为新字段提供了类型、`.describe()` 与默认值/可选性？
- 业务代码是否统一通过 `@/siteConfig` 读取，避免相对路径？
- 是否移除了页面/组件中的站点级硬编码？
- 是否为可选字段在使用端做了兜底处理（如 `??`、显式分支）？

## 备注

- 路径别名见 [tsconfig.json](mdc:tsconfig.json) 中 `baseUrl` 与 `paths`（`@/*` → `src/*`）。
- 若配置变更影响运行时/构建行为（如适配器、输出目标），需同步评估与验证 [astro.config.mjs](mdc:astro.config.mjs) 与构建产物。