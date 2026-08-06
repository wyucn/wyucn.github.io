import { ImageResponse } from "next/og";

// 社媒分享卡片图（微信 / Twitter 等）。构建时静态生成。
// 注：ImageResponse 默认字体不含中文，这里用拉丁字标 WANGYU + 英文副标，避免缺字。
export const dynamic = "force-static";
export const alt = "王玉 — Video Post-Production / Motion Design / AI Workflow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c1721",
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(58,156,139,0.24), transparent 55%), radial-gradient(circle at 75% 70%, rgba(226,91,63,0.16), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 180,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "#f4f0e8",
            lineHeight: 1,
          }}
        >
          <span>WANG</span>
          <span style={{ color: "#3A9C8B" }}>YU</span>
        </div>
        <div
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            fontSize: 30,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#b8c5c8",
          }}
        >
          <span>Video Post · Motion Design · AI Workflow</span>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#E25B3F" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
