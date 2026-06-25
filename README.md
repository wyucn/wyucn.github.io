# wangyu-portfolio-site

王玉的个人作品集网站 —— 视频后期 / Motion & AIGC。

单页作品集，包含 Hero、精选作品、Showreel、关于我、联系方式等模块，支持深 / 浅色主题切换。

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

- `src/lib/site.ts` 中的 `SITE_URL` 改为真实域名（影响 SEO / 分享卡片 / sitemap）。
- `src/data/projects.ts` 中将占位作品替换为真实作品图与链接。
- 放入简历 `public/resume.pdf` 后，可在「关于我」区开启「下载简历」按钮。
- 在 `src/components/Footer.tsx` 中补全社媒真实链接（YouTube / Behance / Twitter 等）。

## 目录结构

```
src/
  app/          页面、布局、全局样式、SEO 文件（sitemap / robots / OG 图）
  components/   各区块组件（Hero / Works / Showreel / About / Footer ...）
  data/         作品等内容数据（与组件分离，便于维护）
public/
  images/       头像、封面图
  videos/       Showreel 视频
```
