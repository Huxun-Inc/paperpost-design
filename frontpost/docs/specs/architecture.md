# FrontPost 架构设计

## 分层

```text
Client Apps -> BFF API -> Supabase Auth/Postgres/Storage -> AI Jobs/External Sources
```

- Client Apps：只持有匿名 key，通过 Supabase Auth 获取用户会话。
- BFF API：聚合推荐流、摘要任务、审计、服务端密钥访问。
- Supabase：Postgres 作为事实源，RLS 控制行级访问。
- AI Jobs：异步摘要与引用抽取，输出进入 `ai_summaries`。

## 数据域

- Identity：profiles、preferences。
- Content：sources、papers、paper_topics、citations。
- Personalization：interests、reading_events、feedback_events。
- AI：ai_summaries、prompt_versions、generation_runs。

## 发布策略

- Web：Vercel / Cloudflare Pages。
- Mobile：Expo EAS Build + staged rollout。
- API：Fly.io / Render / Cloud Run 均可。
- Supabase：staging 与 production 项目隔离。
