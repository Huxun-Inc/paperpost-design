# FrontPost 生产级 Monorepo 初步框架

> 目标：把 FrontPost 从「设计系统站点」扩展为可长期演进的跨端产品仓库。设计系统本身已经作为独立库发布，本业务仓库只消费它，不再在 `packages/design-system` 中重复维护。

## 1. 顶层目录

```text
frontpost/
├── README.md
├── frontend/                         # 所有用户端体验
│   ├── web/                          # Vite + React Web
│   ├── mobile/                       # Expo + React Native 共享层
│   │   ├── app/                      # Expo Router 路由
│   │   ├── src/
│   │   │   ├── shared/               # iOS / Android 共用业务代码
│   │   │   ├── ios/                  # iOS 专属能力：Share Extension、推送权限、StoreKit
│   │   │   └── android/              # Android 专属能力：Intent、通知 Channel、Play Billing
│   │   ├── ios/                      # Expo prebuild 后的原生工程，可按需生成
│   │   └── android/                  # Expo prebuild 后的原生工程，可按需生成
│   ├── desktop/                      # 预留：Tauri / Electron 桌面端
│   └── shared/                       # 前端共享代码，不放设计系统实现
│       ├── api-client/               # OpenAPI 生成客户端、请求封装
│       ├── auth/                     # Supabase / OAuth 会话适配
│       ├── config/                   # 前端环境变量、feature flags
│       ├── domain/                   # Article、Paper、Feed、UserPreference 类型
│       ├── i18n/                     # zh / en / ar 等语言资源
│       └── telemetry/                # Sentry、OpenTelemetry Web SDK 封装
├── backend/                          # FastAPI + RQ/Redis 后端
│   ├── api/                          # HTTP API 服务
│   │   ├── app/
│   │   │   ├── main.py               # FastAPI app factory，启动时打印 FrontPost-Backend-API
│   │   │   ├── routers/              # auth、feeds、papers、search、billing、admin
│   │   │   ├── dependencies/         # DB、Redis、鉴权、限流依赖
│   │   │   └── middleware/           # request id、CORS、日志、错误处理
│   │   ├── pyproject.toml
│   │   └── Dockerfile
│   ├── worker/                       # 异步任务 Worker
│   │   ├── app/
│   │   │   ├── main.py               # 启动时打印 FrontPost-Backend-Worker
│   │   │   ├── queues.py             # high/default/low/crawler/ai 队列定义
│   │   │   ├── jobs/                 # 摘要、Embedding、邮件、通知、导入导出
│   │   │   └── crawlers/             # arXiv、Crossref、RSS、Publisher adapter
│   │   └── Dockerfile
│   ├── scheduler/                    # 定时调度进程
│   │   ├── app/main.py               # 启动时打印 FrontPost-Backend-Scheduler
│   │   └── schedules/                # cron-like 采集、重试、清理、日报生成
│   ├── shared/                       # 后端共享模块
│   │   ├── core/                     # settings、logging、banner、security
│   │   ├── db/                       # SQLAlchemy / Alembic / repositories
│   │   ├── models/                   # Pydantic schema、领域模型
│   │   ├── integrations/             # OpenAI、Supabase、Stripe、邮件、对象存储
│   │   └── observability/            # metrics、tracing、structured logs
│   ├── migrations/                   # Alembic migration
│   └── tests/                        # unit / integration / contract tests
├── infra/                            # 部署与本地环境
│   ├── docker/
│   │   ├── docker-compose.yml        # web、api、worker、scheduler、redis、postgres
│   │   └── .env.example
│   ├── k8s/
│   │   ├── base/                     # Namespace、ConfigMap、Secret 模板、Ingress
│   │   └── overlays/                 # dev / staging / prod
│   └── terraform/                    # 云资源预留
├── docs/                             # 产品、工程、运维文档
│   ├── architecture.md
│   ├── api-contract.md
│   ├── crawler-policy.md
│   ├── security.md
│   ├── release-checklist.md
│   └── runbooks/
├── scripts/                          # 本地和 CI 工具脚本
│   ├── frontpost-banner.sh
│   ├── dev.sh
│   ├── lint.sh
│   ├── test.sh
│   └── ci-quality-gate.sh
└── .github/workflows/                # CI/CD：lint、test、build、image、deploy
```

## 2. 为什么不保留 `packages/design-system`

- FrontPost Design 已经通过 GitHub Pages 发布设计规范与品牌资产，业务仓库应通过 npm 包、Git submodule 或版本化静态资产消费设计系统。
- 本仓库只保留 `frontend/shared` 与 `backend/shared`，分别服务业务代码复用，避免把「产品工程共享层」和「设计系统库」混在一起。
- 如果后续确实需要业务级 UI glue code，可放在 `frontend/shared/ui-adapters`，但组件源代码仍来自独立 design 库。

## 3. 前端分层

### Web

- `frontend/web/src/app`：路由、页面壳、SEO metadata。
- `frontend/web/src/features`：feed、paper detail、search、reading list、settings。
- `frontend/web/src/widgets`：可复用业务部件，如 `PersonalizedFeed`、`CitationTracePanel`。
- `frontend/web/src/platform`：Web only 能力，如 Service Worker、PWA、浏览器通知。

### Mobile / Expo

- `frontend/mobile/src/shared`：跨 iOS / Android 复用的领域逻辑、hooks、状态管理。
- `frontend/mobile/src/ios`：iOS 独有入口，例如 Share Extension、Widget、StoreKit、APNs 权限说明。
- `frontend/mobile/src/android`：Android 独有入口，例如 Intent 分享、通知 Channel、后台限制策略、Play Billing。
- `frontend/mobile/app`：Expo Router 页面，保持薄路由，复杂业务下沉到 `features`。

## 4. 后端进程模型

| 进程 | 组件名 | 责任 | 扩缩容方式 |
| --- | --- | --- | --- |
| API | `FrontPost-Backend-API` | FastAPI HTTP / WebSocket / OpenAPI | HPA 按 CPU、RPS、延迟扩容 |
| Worker | `FrontPost-Backend-Worker` | AI 摘要、Embedding、邮件、导入导出、长耗时任务 | 按 Redis queue lag 扩容 |
| Scheduler | `FrontPost-Backend-Scheduler` | 周期性爬虫、日报、清理、补偿任务 | 通常 1 副本；用锁避免重复调度 |
| Crawler Worker | `FrontPost-Backend-Crawler` | 外部站点抓取、RSS、论文元数据同步 | 独立队列，限速和熔断 |

建议采用 RQ / Redis 模式：RQ 是 Redis-backed Python job queue，适合把耗时或阻塞任务放到后台 Worker；RQ 官方调度能力支持每个队列只有一个 active scheduler，适合在多实例中避免同队列重复调度。生产环境如需更复杂 workflow，再升级到 Celery / Temporal。

## 5. 定时任务与爬虫设计

- `scheduler` 只负责任务发现与入队，不直接执行抓取。
- `crawler` 队列按来源拆分：`crawler.arxiv`、`crawler.crossref`、`crawler.rss`、`crawler.publisher`。
- 每个来源必须有：限速、robots / ToS 记录、增量游标、失败重试、死信队列、幂等 key。
- 抓取原文、解析、AI 摘要、Embedding 分成独立 job，避免单个任务过大。
- 生产指标：queue lag、job duration、retry rate、source error rate、freshness SLA。

## 6. Docker / Kubernetes 预案

- 每个可运行部件都有独立 Dockerfile：`frontend/web`、`backend/api`、`backend/worker`、`backend/scheduler`。
- 镜像启动统一打印 banner，首行包含组件名，例如 `FrontPost-Frontend-Web`。
- K8s 拆分 Deployment：`web`、`api`、`worker-default`、`worker-ai`、`worker-crawler`、`scheduler`。
- Redis / Postgres 在本地由 compose 启动，生产优先托管服务。
- Secrets 通过 External Secrets / Sealed Secrets 管理，不进入 Git。
- Readiness：API 检查 DB/Redis；Worker 检查 Redis；Web 检查静态服务健康。

## 7. 统一启动标识

所有服务启动时输出同一种结构，方便 CI/CD、多控制台和日志平台快速识别：

```text
✦ FrontPost · 前沿邮报
Component: FrontPost-Frontend-Web
Environment: local
Version: 0.1.0
```

推荐组件名：

- `FrontPost-Frontend-Web`
- `FrontPost-Frontend-Mobile-IOS`
- `FrontPost-Frontend-Mobile-Android`
- `FrontPost-Backend-API`
- `FrontPost-Backend-Worker`
- `FrontPost-Backend-Scheduler`
- `FrontPost-Backend-Crawler`
