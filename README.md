# wangyu-portfolio-site

王玉的个人作品集网站 —— 视频后期 / Motion & AIGC。

单页作品集，包含 Hero、Showreel、精选作品、工作经历、能力、关于我和联系方式等模块，支持深 / 浅色主题切换。

当前品牌视觉采用“墨海玉青 · 朱砂点火”：墨海蓝黑作为环境底色，玉青作为个人识别色，朱砂用于播放、主要 CTA 与少量关键状态。

## 技术栈

- [Next.js 16](https://nextjs.org)（App Router，静态导出 `output: "export"`）
- React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [GSAP](https://gsap.com) —— 滚动触发与入场动画
- [Lenis](https://github.com/darkroomengineering/lenis) —— 平滑滚动

## 本地开发

```bash
npm install      # 安装依赖
npm run dev      # 启动开发服务器 http://localhost:3000
npm run lint     # 代码检查
```

## 构建与部署

```bash
npm run build    # 静态导出，产物在 out/ 目录
```

本项目使用 `output: "export"`，构建产物为纯静态文件（`out/`），可直接部署到任意静态托管（如对象存储 / Nginx / Vercel / GitHub Pages）。

## 上线前需要补充的内容

- 为 `src/data/projects.ts` 中的六个真实项目补充可公开封面、截图、短视频与更多链接。
- 放入简历 `public/resume.pdf` 后，可在「关于我」区开启「下载简历」按钮。
- 在 `src/components/Footer.tsx` 中补全社媒真实链接（YouTube / Behance / Twitter 等）。

## 设计与内容文档

- `docs/个人网站配色规范-墨海玉青.md`
- `docs/招聘向网站文案-审阅稿-v2.md`
- `docs/重设计整合说明-2026-08-06.md`

## 目录结构

```
src/
  app/          页面、布局、全局样式、SEO 文件（sitemap / robots / OG 图）
  components/   各区块组件（Hero / Works / Showreel / About / Footer ...）
  data/         作品等内容数据（与组件分离，便于维护）
public/
  images/       头像、封面图
  videos/       Showreel 视频
docs/           品牌配色、招聘文案与重设计整合记录
```
