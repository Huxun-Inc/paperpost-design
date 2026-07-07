# FrontPost 多端产品仓库

FrontPost 是面向全球研究者的 AI 前沿知识邮报产品。本仓库是从 `frontpost-design` 设计系统落地的多端 Web/移动/后端一体化工程蓝图，目标托管位置为 `github.com/hunxun-inc/frontpost`。

## 技术栈

- Web：React + Vite + TypeScript，自适应桌面/移动 Web。
- Mobile：React Native + Expo + TypeScript，覆盖 iOS / Android。
- API：Node.js + Fastify + TypeScript，统一 BFF 与任务入口。
- Database/Auth/Storage：Supabase PostgreSQL、RLS、Edge Functions 预留。
- Package manager：pnpm workspace。

## 工作区结构

```text
apps/web        React 自适应 Web 客户端
apps/mobile     Expo React Native iOS / Android 客户端
apps/api        Fastify API / BFF 服务
packages/ui     跨端设计 token 与基础组件契约
packages/config 共享 TypeScript / ESLint 配置
supabase         本地 Supabase schema、RLS、seed 与迁移
docs/specs       产品、架构、编码规范与验收标准
```

## 本地开发

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

如需本地 Supabase：

```bash
supabase start
supabase db reset
```

## 创建远端仓库

我无法直接替你在 GitHub 组织中创建仓库。请在具备权限的终端执行：

```bash
gh repo create hunxun-inc/frontpost --private --source ./frontpost --remote origin --push
```

## 设计来源

实现必须遵循 FrontPost Design：品牌色、纸张质感、Paper Card、Summary Block、Command Bar、Citation Trace、多语言、RTL 与无障碍规范。
