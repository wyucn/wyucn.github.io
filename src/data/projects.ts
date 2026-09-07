export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  href: string;
  cover: "studio" | "canvas" | "voice" | "formula" | "slides";
  access: "public" | "private";
}

export const projects: Project[] = [
  { id: 1, title: "Post Studio", category: "CREATIVE SYSTEM", year: "2026", cover: "studio", access: "private", href: "https://github.com/wyucn/poststudio" },
  { id: 2, title: "A11IN", category: "MULTIMODAL CANVAS", year: "2026", cover: "canvas", access: "private", href: "https://github.com/wyucn/A111n" },
  { id: 3, title: "Qwen3-TTS Studio", category: "LOCAL VOICE LAB", year: "2026", cover: "voice", access: "public", href: "https://github.com/wyucn/qwen3-tts-studio" },
  { id: 4, title: "Formula Frame", category: "MOTION UTILITY", year: "2026", cover: "formula", access: "public", href: "https://github.com/wyucn/FormulaFrame" },
  { id: 5, title: "PPT2AE", category: "WORKFLOW TRANSLATOR", year: "2026", cover: "slides", access: "public", href: "https://github.com/wyucn/PPT2AE" },
];
