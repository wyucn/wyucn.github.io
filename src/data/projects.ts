// 作品数据 —— 内容与组件分离，未来换真实作品只改这里。
//
// 现在是占位数据（纯色块 + 编号展示）。等你有真实作品图时：
//   1. 把图片放到 public/images/works/ 下；
//   2. 给对应作品加 image: "/images/works/xxx.jpg"；
//   3. 如要点击跳转到外部（如 B 站作品页），加 href: "https://..."。
// Works 组件会自动优先展示真实图片 / 启用跳转，无需改组件代码。

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  /** 主题色，用于占位块与标签描边 */
  color: string;
  /** 卡片比例 */
  aspect: "landscape" | "portrait";
  /** 真实作品缩略图路径，留空则显示占位块 */
  image?: string;
  /** 点击跳转的外部链接（如 B 站作品页），留空则不可点击 */
  href?: string;
  /** 简短描述（可选） */
  description?: string;
}

export const projects: Project[] = [
  { id: 1, title: "Lumina", category: "动画摄影", year: "2025", color: "#AAFF00", aspect: "landscape" },
  { id: 2, title: "Flux", category: "MG动画", year: "2025", color: "#00ff88", aspect: "portrait" },
  { id: 3, title: "Ethereal", category: "风格化渲染", year: "2024", color: "#00ccff", aspect: "landscape" },
  { id: 4, title: "Synth", category: "AIGC 实验", year: "2024", color: "#ff6b9d", aspect: "portrait" },
  { id: 5, title: "Orbit", category: "动画摄影", year: "2024", color: "#ffd700", aspect: "landscape" },
  { id: 6, title: "Construct", category: "三维动画", year: "2023", color: "#c084fc", aspect: "portrait" },
];
