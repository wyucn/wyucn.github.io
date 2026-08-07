export type ProjectVisual =
  | "studio"
  | "music"
  | "prompt"
  | "formula"
  | "slides"
  | "voice";

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  status: string;
  color: string;
  visual: ProjectVisual;
  featured?: boolean;
  description: string;
  role: string;
  tags: string[];
  href?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Haitun Post Studio",
    category: "AIGC 产品 / 工作流",
    year: "2026",
    status: "团队内部使用",
    color: "#83E2CA",
    visual: "studio",
    featured: true,
    description:
      "把图像、视频、音乐、配音与生成任务集中到同一项目空间的 AIGC 协作平台，已投入团队实际使用。",
    role: "产品发起 · 需求与流程设计 · AI 协作实现 · 使用迭代",
    tags: ["项目协作", "生成溯源", "任务与素材管理"],
    href: "https://haitun-post-studio.run.zhenguanyu.com/",
  },
  {
    id: 2,
    title: "新光办事处",
    category: "AI 音乐 / 动画后期",
    year: "2026",
    status: "创作实践",
    color: "#83E2CA",
    visual: "music",
    description:
      "为原创动画探索 AI 主题曲与配乐方向，并参与声音与画面的后期整合。",
    role: "音乐方向探索 · 版本比较 · 声画后期整合",
    tags: ["AI 音乐", "动画后期", "声音设计"],
  },
  {
    id: 3,
    title: "即梦提示词助手",
    category: "提示词工具 / 知识整理",
    year: "2026",
    status: "离线网页工具",
    color: "#83E2CA",
    visual: "prompt",
    description:
      "将 Seedance 与 Seedream 的提示规则整理成可离线使用的填空式工具，支持分镜时间轴、规则校验与草稿导入导出。",
    role: "知识整理 · 工作流设计 · AI 协作实现",
    tags: ["提示词拼装", "规则校验", "分镜时间轴"],
  },
  {
    id: 4,
    title: "海豚后期公式生成",
    category: "AE 工作流 / 创作工具",
    year: "2026",
    status: "内部工作流工具",
    color: "#83E2CA",
    visual: "formula",
    description:
      "连接公式输入、截图识别与 AE 素材导出，减少教育内容中公式制作与反复调整。",
    role: "需求与流程设计 · AI 协作实现 · 使用验证",
    tags: ["公式识别", "透明素材", "AE 工作流"],
  },
  {
    id: 5,
    title: "PPT2AE",
    category: "桌面工具 / 工作流自动化",
    year: "2026",
    status: "Windows 桌面工具",
    color: "#83E2CA",
    visual: "slides",
    description:
      "将 PowerPoint 页面解析为 After Effects 可执行脚本，保留常见文本、图片、形状与版式信息；已完成 Windows 可执行程序。",
    role: "需求与流程设计 · AI 协作实现 · 测试迭代",
    tags: ["PPT 解析", "AE 脚本", "桌面工具"],
  },
  {
    id: 6,
    title: "Local AI Voice Lab",
    category: "本地 AI / 声音工作流",
    year: "2026",
    status: "本地实验工作台",
    color: "#83E2CA",
    visual: "voice",
    description:
      "在 AI 协助下搭建 Qwen3-TTS 与 RVC 工作台，完成音色设计、训练与推理测试，评估本地声音方案的实际可用性。",
    role: "素材准备 · 部署推进 · 使用测试 · 结果评估",
    tags: ["声音克隆", "音色设计", "本地模型"],
  },
];
