import Link from "next/link";
import ArrowUpRightIcon from "@/components/ArrowUpRightIcon";

export default function NotFound() {
  return (
    <>
      <title>页面未找到｜王玉</title>
      <main
        style={{
          position: "relative",
          minHeight: "100svh",
          overflow: "hidden",
          display: "grid",
          placeItems: "center",
          padding: "clamp(24px, 6vw, 72px)",
          color: "#f2f1ec",
          background:
            "radial-gradient(circle at 78% 24%, rgba(131, 226, 202, 0.14), transparent 34%), #07090a",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "50% auto auto 50%",
            transform: "translate(-50%, -52%)",
            color: "rgba(242, 241, 236, 0.035)",
            fontSize: "clamp(220px, 45vw, 760px)",
            fontWeight: 800,
            letterSpacing: "-0.09em",
            lineHeight: 0.75,
            userSelect: "none",
          }}
        >
          404
        </div>

        <section
          style={{
            position: "relative",
            zIndex: 1,
            width: "min(100%, 760px)",
            borderTop: "1px solid rgba(242, 241, 236, 0.2)",
            paddingTop: "clamp(24px, 4vw, 44px)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#83e2ca",
              fontSize: 12,
              fontWeight: 650,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            404 / Lost frame
          </p>
          <h1
            style={{
              maxWidth: 680,
              margin: "clamp(22px, 4vw, 38px) 0 0",
              fontSize: "clamp(44px, 9vw, 96px)",
              fontWeight: 650,
              letterSpacing: "-0.055em",
              lineHeight: 0.98,
            }}
          >
            这一帧，不在时间线上。
          </h1>
          <p
            style={{
              maxWidth: 520,
              margin: "clamp(24px, 4vw, 38px) 0 0",
              color: "#a4aaa7",
              fontSize: "clamp(15px, 2vw, 18px)",
              lineHeight: 1.75,
            }}
          >
            你访问的页面可能已被移动、删除，或从未存在。回到作品集，继续浏览影像、动态设计与
            AI 工作流实践。
          </p>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              marginTop: "clamp(30px, 5vw, 48px)",
              border: "1px solid rgba(131, 226, 202, 0.55)",
              borderRadius: 999,
              padding: "13px 20px",
              color: "#f2f1ec",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
            }}
          >
            返回作品集
            <span style={{ color: "#83e2ca", fontSize: 16 }}>
              <ArrowUpRightIcon />
            </span>
          </Link>
        </section>

        <p
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "clamp(24px, 6vw, 72px)",
            bottom: "clamp(18px, 3vw, 32px)",
            margin: 0,
            color: "rgba(164, 170, 167, 0.55)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Wangyu · Video Post · Motion Design
        </p>
      </main>
    </>
  );
}
