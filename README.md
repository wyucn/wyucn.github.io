# wangyu-portfolio-site

王玉的个人作品集网站 —— 视频后期 / Motion & AIGC。

线上地址：<https://wyucn.com>（同一份产物也可从 <https://wyucn.github.io> 访问，canonical 统一指向 `wyucn.com`）

这是当前正式维护的单页作品集，页面依次包含 Hero、Showreel、Selected Frames 横向画廊、五个项目、关于我和联系方式。

生产版本采用固定深色电影感长页：墨黑承担环境与内容背景，暖纸白用于主要文字和 CTA，玉青 `#83E2CA` 用于品牌与交互状态。全屏影像 Hero 建立职业识别，标题从首屏中央随滚动缩放归位，王玉的手写签名以玉青路径在标题后方逐渐写出；Showreel 后使用六张代表帧组成滚动驱动的横向影集。左上保留斜体 `WANGYU` 字标，页尾不重复签名。

移动端保留同一叙事顺序，并将桌面 hover 与滚动编舞转换为原生触摸交互：项目界面和代表帧可横向吸附浏览，不劫持页面纵向滚动。

C 盘中的纯静态版本仅保留为历史视觉原型。当前功能、内容、SEO 和部署均以本仓库为准。

## 技术栈

- [Next.js 16](https://nextjs.org)（App Router，静态导出 `output: "export"`）
- React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [GSAP](https://gsap.com) —— 滚动触发与入场动画

## 本地开发

```bash
npm install      # 安装依赖
npm run dev      # 启动开发服务器 http://localhost:3000
npm run lint     # 代码检查
npm run build    # 生产构建与静态导出
```

## 构建与部署

```bash
npm run build    # 静态导出，产物在 out/ 目录
```

本项目使用 `output: "export"`，构建产物为纯静态文件（`out/`）。`out/` 与 `.next/` 都是忽略的生成目录，不提交到 Git。

推送到 `main` 后，[GitHub Actions](.github/workflows/deploy.yml) 使用 Node.js 22 执行 `npm ci` 和 `npm run build`，再将 `out/` 自动部署到 GitHub Pages。其他静态托管也可直接使用同一构建产物。

## 当前内容状态与后续完善

- Hero 背景视频、Hero 海报、Showreel 视频、Showreel 海报、Selected Frames 六张代表帧和头像均已使用真实媒体。
- 五个项目（Post Studio、A111n、Qwen3-TTS Studio、Formula Frame、PPT2AE）均已接入隔离或脱敏后的真实界面。
- 五个项目都提供公开 GitHub 外链；`access` 字段须与仓库实际可见性一致，改动仓库可见性后要同步该字段，否则卡片会误标 PRIVATE GITHUB。
- 项目名称须与仓库名一致（例如 `A111n`，非 `A11IN`），`data/projects.ts` 与 `components/Works.tsx` 内的界面文字要一起改。
- 尚未加入可公开的 PDF 简历；补充后应在联系区增加下载入口。
- 当前公开的社媒为哔哩哔哩与 GitHub；其他平台应在本人确认真实主页后再添加。
- `components/Experience.tsx` 与 `components/Capabilities.tsx` 未接入 `app/page.tsx`，不参与线上渲染，请勿据其内容判断站点实际内容。
- 后续优先补充 Selected Frames 的原始高清截图，以及更清楚的制作过程和职责证据。

## 设计与内容文档

- [`docs/视觉系统-当前生产基线-v4.md`](docs/视觉系统-当前生产基线-v4.md)：唯一现行视觉与交互规范。
- [`docs/招聘向网站文案-长文案素材库-v2.md`](docs/招聘向网站文案-长文案素材库-v2.md)：长文案素材库，线上采用压缩版本，不保证逐字一致。
- `docs/archive/`：已废止的配色方案、视觉研究与历史整合记录，不作为生产实现依据。

## 目录结构

```
src/
  app/          页面、布局、全局样式、SEO 文件（sitemap / robots / OG 图）
  components/   Hero、Showreel、SelectedFrames、Works、About、Footer 等线上区块
                （Experience、Capabilities 保留但未接入页面）
  data/         作品等内容数据（与组件分离，便于维护）
  lib/          站点 URL、SEO 文案和公开社媒常量
public/
  images/       头像、Hero / Showreel 海报、Selected Frames 与脱敏项目界面
  videos/       Hero 背景与 Showreel 视频
docs/           当前视觉基线、文案素材与历史归档
.github/        GitHub Pages 自动构建与部署工作流
```
