# 内容模型

## Paper

核心字段：

- `id`
- `title`
- `authors`
- `source`
- `publishedAt`
- `categories`
- `tags`
- `abstract`
- `plainSummary`
- `keyFinding`
- `whyItMatters`
- `methods`
- `limitations`
- `originalUrl`
- `pdfUrl`
- `estimatedReadMinutes`
- `recommendationReason`

## Daily Briefing

字段：

- 日期。
- 今日总论文数。
- 推荐精选。
- 热门关键词。
- 新兴主题。
- 预计阅读时间。
- 用户错过的高价值内容。

## 推荐解释

推荐解释要短、具体、可验证：

- 因为你收藏过 `reasoning`。
- 来自你关注的作者。
- 这个关键词本周升温。
- 与你最近读完的论文方法相似。

不要使用：

- “算法认为你可能喜欢”。
- “热门推荐”。
- “猜你喜欢”但不给理由。

## 可信度标记

论文不是新闻，前端必须保留可信线索：

- 来源：arXiv、Nature、Science、会议、期刊。
- 原文链接。
- 作者和机构。
- 发布时间。
- 是否同行评审。
- 模型生成摘要的声明和可纠错入口。

## 摘要层级

- 一句话：用于卡片。
- 关键发现：用于详情首屏。
- Plain English：用于快速理解。
- Deep Dive：用于方法和局限。
- Original：用于原文深读。
