import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Agent Ready by AgenticLedger";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #ecfdf5 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#059669",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            AR
          </div>
          <span style={{ fontSize: "28px", fontWeight: 600, color: "#1e293b" }}>
            Agent Ready
          </span>
        </div>
        <div
          style={{
            fontSize: "52px",
            fontWeight: 700,
            color: "#0f172a",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "900px",
            marginBottom: "24px",
          }}
        >
          Make your app accessible to every AI agent
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#64748b",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          Connect your app to Claude, ChatGPT, Gemini, Grok & any AI agent
        </div>
        <div
          style={{
            marginTop: "40px",
            fontSize: "18px",
            color: "#059669",
            fontWeight: 600,
          }}
        >
          agentready.agenticledger.ai
        </div>
      </div>
    ),
    { ...size }
  );
}
