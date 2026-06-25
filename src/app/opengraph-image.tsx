import { ImageResponse } from "next/og";

// 社媒分享卡片图（微信 / Twitter 等）。构建时静态生成。
// 注：ImageResponse 默认字体不含中文，这里用拉丁字标 WANGYU + 英文副标，避免缺字。
export const dynamic = "force-static";
export const alt = "王玉 — Video Post-Production / Motion & AIGC";
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
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(170,255,0,0.18), transparent 55%), radial-gradient(circle at 75% 70%, rgba(0,204,255,0.12), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 180,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "#ededed",
            lineHeight: 1,
          }}
        >
          <span>WANG</span>
          <span style={{ color: "#AAFF00" }}>YU</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#888888",
          }}
        >
          Video Post-Production · Motion · AIGC
        </div>
      </div>
    ),
    { ...size }
  );
}
