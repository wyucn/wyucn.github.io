export type ProjectVisual =
  | "studio"
  | "music"
  | "prompt"
  | "formula"
  | "slides"
  | "voice";

export interface ProjectMedia {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  position?: string;
  background?: string;
}

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
  role: string[];
  tags: string[];
  media?: ProjectMedia[];
  mediaLabel?: string;
  href?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Haitun Post Studio",
    category: "AIGC 产品 / 工作流",
    year: "2026",
    status: "已投入团队实际使用",
    color: "#83E2CA",
    visual: "studio",
    featured: true,
    description:
      "将图像、视频、音乐、配音与生成任务整合进同一项目空间，让团队协作、素材管理与生成溯源在一处完成。",
    role: ["产品发起", "需求定义", "流程设计", "AI 协作实现", "持续迭代"],
    tags: ["项目协作", "生成溯源", "任务与素材管理"],
    mediaLabel: "隔离演示界面",
    media: [
      {
        src: "/images/projects/haitun-studio-current-video.webp",
        alt: "Haitun Post Studio 视频创作工作台",
        background: "#f6f6f0",
      },
      {
        src: "/images/projects/haitun-studio-current-assets.webp",
        alt: "Haitun Post Studio 的项目素材与资源管理界面",
        background: "#f6f6f0",
      },
    ],
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
      "围绕原创动画探索 AI 主题曲与配乐方向，并参与声画后期整合。",
    role: ["音乐方向探索", "版本对比", "声画后期整合"],
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
      "把 Seedance 与 Seedream 的提示规则整理为可离线使用的填空式工具，支持分镜时间轴、规则校验和草稿导入导出。",
    role: ["知识整理", "工作流设计", "AI 协作实现"],
    tags: ["提示词拼装", "规则校验", "分镜时间轴"],
    mediaLabel: "虚构内容演示",
    media: [
      {
        src: "/images/projects/prompt-assistant-overview.webp",
        alt: "即梦提示词助手的规则说明与提示词预览界面",
        background: "#15181f",
      },
      {
        src: "/images/projects/prompt-assistant-timeline.webp",
        alt: "即梦提示词助手的分镜时间轴与片段编辑界面",
        background: "#15181f",
      },
    ],
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
      "打通公式输入、截图识别与 AE 素材导出，简化教育视频中的公式制作和反复调整。",
    role: ["需求定义", "流程设计", "AI 协作实现", "使用验证"],
    tags: ["公式识别", "透明素材", "AE 工作流"],
    mediaLabel: "通用公式演示",
    media: [
      {
        src: "/images/projects/formula-tool-editor.webp",
        alt: "海豚后期公式生成的输入、预览与导出界面",
        background: "#07120b",
      },
      {
        src: "/images/projects/formula-tool-quickref.webp",
        alt: "海豚后期公式生成的公式速查与 LaTeX 示例界面",
        background: "#07120b",
      },
    ],
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
      "将 PowerPoint 页面转换为 After\u00a0Effects 可执行脚本，尽量保留文本、图片、形状与版式信息；现已打包为 Windows 桌面程序。",
    role: ["需求定义", "流程设计", "AI 协作实现", "测试迭代"],
    tags: ["PPT 解析", "AE 脚本", "桌面工具"],
    mediaLabel: "空白演示界面",
    media: [
      {
        src: "/images/projects/ppt2ae-empty-interface-wide.webp",
        alt: "PPT2AE 的文件导入、输出参数与脚本生成界面",
        background: "#eef0f5",
      },
    ],
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
      "在 AI 协助下搭建 Qwen3-TTS 与 RVC 本地工作台，完成音色设计、训练和推理测试，并评估其在实际制作中的可用性。",
    role: ["素材准备", "环境部署", "使用测试", "结果评估"],
    tags: ["声音克隆", "音色设计", "本地模型"],
    mediaLabel: "模拟 API / 空历史",
    media: [
      {
        src: "/images/projects/voice-lab-builtins.webp",
        alt: "本地 AI 语音工作台的内置音色界面",
        background: "#f7f7f7",
      },
      {
        src: "/images/projects/voice-lab-clone-empty.webp",
        alt: "本地 AI 语音工作台的音色克隆配置界面",
        background: "#f7f7f7",
      },
    ],
  },
];
