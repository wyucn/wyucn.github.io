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
    category: "AIGC Product / Workflow",
    year: "2026",
    status: "团队内部使用",
    color: "#E86649",
    visual: "studio",
    featured: true,
    description:
      "面向内容与后期团队的项目制 AIGC 协同创作平台，将图像、视频、音乐、配音、素材与生成任务集中到同一个工作空间。",
    role: "产品发起 · 需求与流程设计 · AI 协作实现 · 使用迭代",
    tags: ["项目协作", "生成溯源", "任务与素材管理"],
    href: "https://haitun-post-studio.run.zhenguanyu.com/",
  },
  {
    id: 2,
    title: "新光办事处",
    category: "AI Music / Animation Post",
    year: "2026",
    status: "创作实践",
    color: "#4FB7A2",
    visual: "music",
    description:
      "围绕原创动画项目进行 AI 主题曲与配乐方向实验，探索角色氛围、叙事节奏与画面之间的视听统一。",
    role: "音乐方向探索 · 版本比较 · 声画后期整合",
    tags: ["AI 音乐", "动画后期", "声音设计"],
  },
  {
    id: 3,
    title: "即梦提示词助手",
    category: "Prompt Tool / Knowledge Product",
    year: "2026",
    status: "离线网页工具",
    color: "#49A895",
    visual: "prompt",
    description:
      "将 Seedance 与 Seedream 官方手册中的公式、素材限制、时间轴规则和示例词库，整理成可直接使用的结构化提示词工具。",
    role: "需求定义 · 知识整理 · AI 协作实现 · 使用验证",
    tags: ["提示词拼装", "规则校验", "分镜时间轴"],
  },
  {
    id: 4,
    title: "海豚后期公式生成",
    category: "AE Workflow / Creative Tool",
    year: "2026",
    status: "内部工作流工具",
    color: "#B8C5C8",
    visual: "formula",
    description:
      "面向 After Effects 的公式素材工具，支持文字、LaTeX、自然语言和截图输入，并输出适配合成的透明 PNG 与 SVG。",
    role: "后期需求定义 · 输出标准设计 · 测试与迭代",
    tags: ["公式识别", "透明素材", "AE 工作流"],
  },
  {
    id: 5,
    title: "PPT2AE",
    category: "Workflow Automation",
    year: "2026",
    status: "Windows 桌面工具",
    color: "#4FB7A2",
    visual: "slides",
    description:
      "根据实际后期需求设计、通过 AI 协作实现的桌面工具，将 PowerPoint 页面转换为 After Effects 可执行脚本。",
    role: "流程设计 · 功能验收 · 兼容性测试 · 持续反馈",
    tags: ["PPT 解析", "AE 脚本", "桌面工具"],
  },
  {
    id: 6,
    title: "Local AI Voice Lab",
    category: "Local AI / Voice Workflow",
    year: "2026",
    status: "本地实验工作台",
    color: "#3A9C8B",
    visual: "voice",
    description:
      "围绕 Qwen3-TTS 与 RVC 开展本地语音实践，覆盖音色设计、文字转语音、声音克隆、自定义音色训练与输出比较。",
    role: "创作目标定义 · 语料准备 · 运行测试 · 结果判断",
    tags: ["声音克隆", "音色设计", "本地模型"],
  },
];
