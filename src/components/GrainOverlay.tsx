/**
 * 全局胶片噪点：纯 CSS 实现（见 globals.css 的 .grain-overlay），
 * reduced-motion 下自动静止。
 */
export default function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
