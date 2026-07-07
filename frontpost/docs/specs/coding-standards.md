# FrontPost 大厂级 Spec-Coding 规范

## 1. 工程原则

- 类型先行：所有公共边界必须有 TypeScript 类型或 Zod schema。
- 契约先行：API、数据库、事件、埋点、组件 props 变更必须先改 spec，再改实现。
- 小步提交：每个 PR 只解决一个问题，禁止顺手重构无关模块。
- 安全默认：RLS、最小权限、输入校验、输出编码、密钥隔离是默认要求。
- 可观测默认：服务端日志必须包含 `requestId`、`userId`（可空）、`route`、`durationMs`。

## 2. TypeScript

- `strict: true`，禁止 `any`；确需使用必须注释原因和退出计划。
- 禁止在 import 外层包裹 try/catch。
- 业务实体使用 `type`，可扩展对象协议使用 `interface`。
- 异步函数返回值必须显式标注在公共 API 中。
- 客户端环境变量只能以公开前缀暴露，服务端密钥只允许在 `apps/api` 使用。

## 3. React Web

- 组件默认函数组件，props 类型与组件同文件声明。
- 视觉值必须来自 `packages/ui` token 或 CSS 变量，不允许散落硬编码品牌色。
- 自适应采用 mobile-first：480 / 768 / 1024 / 1280 断点。
- 交互组件必须支持键盘焦点、ARIA 名称、可见 focus ring。
- 数据请求封装在 feature hook，UI 组件保持可测试、可复用。

## 4. React Native

- 使用 Expo managed workflow，除非 ADR 批准不得 eject。
- 导航遵循：底部 Tab 承载一级任务，Stack 承载详情与设置。
- 平台差异必须集中在 `Platform.select` 或 platform 文件，禁止散落判断。
- 支持动态字体、深色模式、RTL；触控目标最小 44×44。

## 5. API / Supabase

- 所有请求输入用 Zod 校验；错误返回遵循 `{ code, message, details? }`。
- 数据表必须包含 `created_at`、`updated_at`；用户数据必须包含 `user_id`。
- RLS policy 与 migration 同 PR 提交。
- 任何 AI 输出必须保存模型、prompt 版本、来源内容 hash 与生成时间。

## 6. 测试门禁

- 单元测试覆盖核心纯函数、schema、权限判断。
- 组件测试覆盖空态、加载态、错误态、RTL、键盘操作。
- API 测试覆盖 2xx、4xx、权限失败与幂等性。
- PR 必须通过 `pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm build`。

## 7. Code Review Checklist

- 是否复用 FrontPost Design token 与组件语义？
- 是否存在密钥泄漏、RLS 漏洞、越权查询？
- 是否对加载、错误、空态、慢网、离线有设计？
- 是否具备可回滚 migration 与向后兼容 API？
- 是否影响 i18n、RTL、无障碍、字号缩放？
