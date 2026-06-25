# 论文日报视觉交互方案规范

这是论文日报 App 的视觉与交互设计仓库，用来沉淀产品气质、组件规范、推荐体验、四端适配和案例研究。

目标不是把论文做成更严肃的 PDF 入口，而是把“发现、理解、收藏、继续读”做成一种轻快的日常信息消费体验：专业、有判断力、亲和、灵动，并且越刷越懂用户。

## 核心方向

- 让用户感觉“刷论文很爽”：低负担进入，高密度获得，持续有下一篇值得看。
- 专业但不死板：保留研究可信度，用编辑化排版和清晰层级降低心理压力。
- 推荐系统前端化：每个交互都服务于兴趣建模、反馈收集和下一篇分发。
- 四端一致但不一刀切：mac / iOS / Android / Web 共用设计语言，各自采用最舒服的原生交互。
- 组件先行：沉淀卡片、摘要、关键发现、收藏、听读、数据面板等核心模块。

## 仓库结构

- [docs/design-philosophy.md](docs/design-philosophy.md)：产品气质、设计哲学和体验原则。
- [docs/interaction-principles.md](docs/interaction-principles.md)：推荐、留存、阅读流和反馈机制。
- [docs/component-system.md](docs/component-system.md)：核心组件规范。
- [docs/platform-adaptation.md](docs/platform-adaptation.md)：mac / iOS / Android / Web 四端适配。
- [docs/content-model.md](docs/content-model.md)：论文内容卡片、摘要、标签和可信度结构。
- [docs/visual-language.md](docs/visual-language.md)：色彩、字体、动效、留白和品牌感。
- [cases/toutiao.md](cases/toutiao.md)：今日头条式信息流借鉴。
- [cases/douyin.md](cases/douyin.md)：抖音式沉浸、反馈和留存借鉴。
- [cases/research-app-antipatterns.md](cases/research-app-antipatterns.md)：学术软件反模式清单。
- [tokens/design-tokens.json](tokens/design-tokens.json)：跨端视觉 token 草案。
- [adr/0001-product-experience-direction.md](adr/0001-product-experience-direction.md)：体验方向决策记录。

## 当前 Figma 草稿

Figma 文件：<https://www.figma.com/design/6kWePIR4gW1ZsKBhfAfBTh>

## 使用方式

1. 新功能先在 `docs/interaction-principles.md` 里明确体验目标。
2. 页面设计先查 `docs/component-system.md`，优先复用组件。
3. 跨端开发前对照 `docs/platform-adaptation.md`，不要把移动端交互直接搬到桌面。
4. 评审时用 `cases/research-app-antipatterns.md` 检查有没有变得沉重、像后台系统或像论文数据库。
