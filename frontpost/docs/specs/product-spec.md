# FrontPost 产品与工程规格

## 1. 产品定位

FrontPost 是 AI 原生研究情报产品，把论文、科研新闻、技术趋势与用户兴趣模型组织成可信、轻量、可持续阅读的每日邮报。

## 2. 核心端

| 端 | 范围 | 关键体验 |
| --- | --- | --- |
| Responsive Web | `apps/web` | 首屏信息流、论文卡片、引用追踪、搜索、收藏、设置 |
| iOS / Android | `apps/mobile` | 原生手势、底部 Tab、离线阅读、推送、系统分享 |
| API / BFF | `apps/api` | 推荐流、用户反馈、摘要任务、审计日志 |
| Supabase | `supabase` | Auth、Postgres、RLS、Storage、Realtime |

## 3. MVP 模块

1. 账号：邮箱 magic link、OAuth 预留、用户资料、语言与字体偏好。
2. 兴趣建模：主题、关键词、反馈信号、负反馈与屏蔽来源。
3. 内容流：Paper Card、摘要、关键发现、引用、来源可信度、阅读状态。
4. AI 摘要：TL;DR、贡献点、方法、局限、适读人群、引用链。
5. 收藏与清单：稍后读、项目清单、导出 Markdown / BibTeX 预留。
6. 国际化与无障碍：中文、英文、阿拉伯语首批；完整 RTL、字号缩放、键盘可达。

## 4. 非功能指标

- 首屏 LCP p75 ≤ 2.5s；移动端冷启动 p75 ≤ 3s。
- API p95 ≤ 300ms（非 AI 任务）。
- 所有用户数据表启用 RLS，服务端密钥禁止进入客户端 bundle。
- 关键路径具备可观测性：request id、structured logs、error boundary。
