# doubox-vue 前端项目上手指南

## 项目综述
- 技术栈：`Vue 3`、`Vue Router 4`、`TypeScript`、`Vite 5`、`TailwindCSS 3`、`axios`
- 主要功能：
  - `视频去水印`：解析抖音分享链接，返回无水印视频直链并支持代理播放
  - `文案提取`：从视频生成文字稿
  - `文案仿写`：基于输入文本生成仿写结果
  - `IP 复刻`：占位交互，展示分析流程

## 快速开始
- 前置环境：`Node.js >= 18`
- 安装依赖：`npm i`
- 开发启动：`npm run dev`
- 构建产物：`npm run build`
- 本地预览：`npm run preview`
- 必要环境变量（放置于本地 `.env` 或部署平台环境配置）：
  - `VITE_API_BASE_URL`：后端 API 基础地址（默认 `https://doubox-api.aiweb3.online`）
  - `VITE_FREE_API_KEY`：免费 API Key（默认仓库内置开发值）
  - `VITE_GA_ID`：Google Analytics ID（不配置则不会加载 GA）

## 目录结构与入口
- `index.html`：挂载点 `#app` 与入口脚本 `src/main.ts`（`index.html:1-12`）
- `src/main.ts`：创建应用、注册路由、加载全局样式与 GA（`src/main.ts:1-15`）
- 目录职责：
  - `src/pages`：业务页面（Home、VideoWatermark、TextExtraction、TextImitation、IpReplication）
  - `src/components`：通用 UI 组件（按钮、卡片、输入、模态、Loader、Toast、BackHeader）
  - `src/router`：路由表定义与页面标题 `meta.title`
  - `src/composables`：组合式工具（`useToast`）
  - `src/constants`：常量与配置（`api.ts`）
  - `src/services`：服务模块（`ga.ts`）
  - `src/assets`：全局样式与静态资源
  - 根配置：`vite.config.ts`（插件、别名与 `allowedHosts`），`tailwind.config.ts`（主题与动画），`tsconfig.json`（严格模式与路径别名）

## 路由与页面
- 路由创建：在 `src/main.ts` 中通过 `createRouter` 注册（`src/main.ts:8-11`）
- 路由表：`src/router/index.ts` 定义路径、组件与 `meta.title`（`src/router/index.ts:8-13`）
- 标题与返回：`BackHeader.vue` 根据 `route.meta.title` 显示标题，首页隐藏返回按钮（`src/components/BackHeader.vue:19-26`）
- 页面职责：
  - `Home.vue`：四个工具入口卡片（`src/pages/Home.vue:3-20`）
  - `VideoWatermark.vue`：提交链接 → 调用 `/remove-watermark` → 解析无水印视频；提供代理播放与下载降级（`src/pages/VideoWatermark.vue:68-73,78-88,99-101`）
  - `TextExtraction.vue`：提交链接 → 调用 `/video2text` → 输出文本并支持复制（`src/pages/TextExtraction.vue:41-49,55-58`）
  - `TextImitation.vue`：提交文本 → 调用 `/imitatetext` → 输出仿写结果并支持复制（`src/pages/TextImitation.vue:41-49,55-58`）
  - `IpReplication.vue`：占位交互，展示分析流程与模态提示（`src/pages/IpReplication.vue:32-39`）

## 状态管理
- 未使用 Pinia/Vuex；以组合式 API + 组件局部 `ref/reactive` 为主。
- 全局轻提示：`useToast` 提供 `state/items` 与 `show(payload)`，自动 3 秒移除（`src/composables/useToast.ts:7-16`，渲染在 `src/components/Toast.vue:2-7`）。

## 接口与网络
- 常量：`API_BASE_URL`、`FREE_API_KEY`（`src/constants/api.ts:1-2`）
- 核心端点：
  - `POST /remove-watermark`：入参 `{ key, url, prefer_local }`，返回无水印视频直链与原视频信息（`src/pages/VideoWatermark.vue:78-84`）
  - `POST /video2text`：`headers: { 'x-api-key': FREE_API_KEY }`，返回文本或对象（`src/pages/TextExtraction.vue:41-44`）
  - `POST /imitatetext`：`headers: { 'x-api-key': FREE_API_KEY }`，返回仿写文本或对象（`src/pages/TextImitation.vue:41-44`）
- 错误处理：接口失败通过 `useToast` 提示；视频播放失败显示文案并提供下载按钮（`src/pages/VideoWatermark.vue:28-31,99-101`）。
- 代理播放：为解决跨域/Referrer 问题，视频预览通过 `https://mihoyonb.com/api/video-proxy?url=` 代理（`src/pages/VideoWatermark.vue:68-73`）。

## 样式系统
- Tailwind 原子化：`tailwind.config.ts` 开启 `darkMode: 'class'`，`content` 扫描 `index.html` 与 `src/**/*.{vue,ts}`（`tailwind.config.ts:5-7`）。
- 主题：在 `src/assets/style.css` 中用 CSS 变量定义主题与暗色覆盖（`src/assets/style.css:5-25`）。
- 辅助类：`btn-gradient` 与 `glass`（`src/assets/style.css:27-34`）。

## 分析与埋点
- `VITE_GA_ID` 存在时在 `src/services/ga.ts` 中动态注入 GA；无值则跳过（`src/services/ga.ts:1-13`）。

## 代码规范与约定
- TypeScript 严格模式；路径别名 `@/*` 在 `vite.config.ts` 与 `tsconfig.json` 中配置（`vite.config.ts:15-19`）。
- 组件命名与文件组织遵循功能清晰、原子化样式优先的约定。
- 当前仓库未集成 ESLint/Prettier/Vitest。

## 常用组件速查
- `Card`：包裹内容，支持 `#footer` 插槽。
- `PrimaryButton`、`SecondaryButton`：主/次操作按钮，支持 `disabled`。
- `TextAreaInput`：文本输入，支持 `v-model`、`label`、`placeholder`、`hint`。
- `Loader`：加载提示，包裹文案即显示。
- `Modal`：模态框，`open` 受控，`@update:open` 同步。
- `Toast`：右下角轻提示，全局共享 `useToast` 状态。
- `BackHeader`：页面顶部标题与返回按钮。

## 开发指引
- 新页面：
  - 在 `src/pages` 新增 `.vue` 文件
  - 在 `src/router/index.ts` 注册路由并添加 `meta.title`
  - 在 `Home.vue` 增加入口卡片（`router-link`）
  - 页面内按需调用接口，成功/失败使用 `useToast`
- 新接口：
  - 在 `src/constants/api.ts` 补充常量或在页面中复用 `API_BASE_URL`/`FREE_API_KEY`
  - 用 `axios.post/get` 调用，必要时设置 `headers: { 'x-api-key': FREE_API_KEY }`

## 部署与运维
- 构建与预览：`npm run build`、`npm run preview`
- 域名与主机：`vite.config.ts` 的 `server/preview.allowedHosts` 包含 `doubox.aiweb3.online`（`vite.config.ts:7-14`）
- 环境变量：通过平台注入 `import.meta.env.*`，避免将真实密钥提交仓库。

## 安全与合规
- API Key 仅用于开发/演示；生产环境需在平台安全注入。
- 避免在代码或日志中暴露敏感信息。

## 参考位置（便于定位）
- `package.json:6-9,10-24`
- `vite.config.ts:5-19`
- `index.html:1-12`
- `src/main.ts:8-15`
- `src/router/index.ts:8-13`
- `src/constants/api.ts:1-2`
- `src/services/ga.ts:1-13`
- `src/pages/Home.vue:3-20`
- `src/pages/VideoWatermark.vue:68-73,78-88,99-101`
- `src/pages/TextExtraction.vue:41-49,55-58`
- `src/pages/TextImitation.vue:41-49,55-58`
- `src/composables/useToast.ts:7-16`
- `src/assets/style.css:5-25,27-34`
- `tailwind.config.ts:5-7,8-23,27-44`

## 建议的后续改进
- 封装 `axios` 实例与拦截器，统一错误处理与认证。
- 路由懒加载与基础导航守卫（如统一设置文档标题）。
- 引入 `eslint`、`prettier`、`vitest`，提升规范与可测试性。
- 集成异常监控（如 Sentry）。