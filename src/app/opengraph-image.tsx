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
          background: "#07090a",
          backgroundImage:
            "radial-gradient(circle at 78% 28%, rgba(131,226,202,.16), transparent 38%), linear-gradient(125deg, transparent 48%, rgba(255,255,255,.025) 49%, transparent 51%)",
          backgroundSize: "auto, 240px 240px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 180,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "#f2f1ec",
            lineHeight: 1,
          }}
        >
          <span>WANG</span>
          <span style={{ marginLeft: 18, color: "#83e2ca" }}>YU</span>
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
            color: "#a4aaa7",
          }}
        >
          <span>Video Post · Motion Design · AI Workflow</span>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#83e2ca" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
