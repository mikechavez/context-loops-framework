import { useState } from "react";

const TOTAL_TOKENS = 200000;

const segments = [
  {
    label: "System instructions",
    tokens: 4000,
    color: "#30363d",
    description:
      "Base prompt, safety rules, behavioral instructions. Loaded before you type a word.",
  },
  {
    label: "Tool definitions",
    tokens: 19000,
    color: "#484f58",
    description:
      "Every tool the model can call needs its full schema in context.",
  },
  {
    label: "Context files",
    tokens: 3000,
    color: "#6e7681",
    description:
      "Project memory, config files, skill definitions injected at session start.",
  },
  {
    label: "Reserved buffer",
    tokens: 33000,
    color: "#8b949e",
    description:
      "Space reserved for model output and session management.",
  },
  {
    label: "Usable space",
    tokens: 141000,
    color: "#0ea5e9",
    description:
      "Space left for your conversation and files. This shrinks as you work.",
  },
];

const formatTokens = (n) =>
  n >= 1000 ? `${(n / 1000).toFixed(0)}K` : `${n}`;

export default function ContextWindowDiagram() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const activeIndex =
    hoveredIndex !== null ? hoveredIndex : selectedIndex;

  const overhead = segments
    .filter((_, i) => i < segments.length - 1)
    .reduce((sum, s) => sum + s.tokens, 0);
  const overheadPercent = ((overhead / TOTAL_TOKENS) * 100).toFixed(0);
  const overheadWidth = (overhead / TOTAL_TOKENS) * 100;
  const usableWidth = 100 - overheadWidth;

  return (
    <div
      style={{
        fontFamily: "'IBM Plex Mono', 'SF Mono', 'Fira Code', monospace",
        background: "#0b0f14",
        color: "#c9d1d9",
        padding: "32px",
        borderRadius: "12px",
        maxWidth: "720px",
        margin: "0 auto",
        border: "1px solid #21262d",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color: "#8b949e",
            marginBottom: "6px",
          }}
        >
          Context Window — Before You Type a Single Message
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#f0f6fc",
              letterSpacing: "-0.5px",
            }}
          >
            200K tokens
          </span>
          <span style={{ fontSize: "14px", color: "#8b949e" }}>
            — {overheadPercent}% claimed before your first message
          </span>
        </div>
      </div>

      {/* Overhead / Usable bracket labels */}
      <div
        style={{
          display: "flex",
          marginBottom: "6px",
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          color: "#8b949e",
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: `${overheadWidth}%`,
            textAlign: "center",
            borderBottom: "1px solid #30363d",
            paddingBottom: "4px",
            marginRight: "1px",
          }}
        >
          overhead
        </div>
        <div
          style={{
            width: `${usableWidth}%`,
            textAlign: "center",
            borderBottom: "1px solid #30363d",
            paddingBottom: "4px",
            marginLeft: "1px",
          }}
        >
          usable
        </div>
      </div>

      {/* Stacked bar */}
      <div
        style={{
          display: "flex",
          height: "48px",
          borderRadius: "6px",
          overflow: "hidden",
          marginBottom: "24px",
        }}
      >
        {segments.map((seg, i) => {
          const widthPercent = (seg.tokens / TOTAL_TOKENS) * 100;
          const isUsable = i === segments.length - 1;
          const isHighlighted = activeIndex === i;
          const isDimmed = activeIndex !== null && !isHighlighted;

          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() =>
                setSelectedIndex(selectedIndex === i ? null : i)
              }
              style={{
                width: `${widthPercent}%`,
                background: isUsable
                  ? `repeating-linear-gradient(
                      -45deg,
                      ${seg.color},
                      ${seg.color} 6px,
                      #0d1117 6px,
                      #0d1117 12px
                    )`
                  : seg.color,
                opacity: isDimmed ? 0.35 : isUsable ? 1 : 0.75,
                transition:
                  "opacity 0.25s ease, transform 0.15s ease",
                transform: isHighlighted
                  ? "scaleY(1.05)"
                  : "scaleY(1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRight:
                  i < segments.length - 1
                    ? "1px solid #0b0f14"
                    : "none",
                cursor: "pointer",
                boxShadow: isHighlighted
                  ? "0 0 0 1px rgba(255,255,255,0.1) inset"
                  : "none",
              }}
            >
              {widthPercent > 8 && (
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: isUsable ? "#0ea5e9" : "#c9d1d9",
                    textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                    userSelect: "none",
                  }}
                >
                  {formatTokens(seg.tokens)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      <div
        style={{
          minHeight: "52px",
          marginBottom: "20px",
          padding: "12px 16px",
          background: "#161b22",
          borderRadius: "6px",
          border: "1px solid #21262d",
        }}
      >
        {activeIndex !== null ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "4px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "2px",
                  background: segments[activeIndex].color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#f0f6fc",
                }}
              >
                {segments[activeIndex].label}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#8b949e",
                  marginLeft: "auto",
                }}
              >
                {formatTokens(segments[activeIndex].tokens)} tokens (
                {(
                  (segments[activeIndex].tokens / TOTAL_TOKENS) *
                  100
                ).toFixed(1)}
                %)
              </span>
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#8b949e",
                lineHeight: "1.5",
              }}
            >
              {segments[activeIndex].description}
            </div>
          </>
        ) : (
          <div
            style={{
              fontSize: "13px",
              color: "#8b949e",
            }}
          >
            Hover or click a segment to see what's consuming your
            context window
          </div>
        )}
      </div>

      {/* Legend — onMouseLeave on container, onMouseEnter on rows */}
      <div
        onMouseLeave={() => setHoveredIndex(null)}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4px 24px",
        }}
      >
        {segments.map((seg, i) => {
          const isUsable = i === segments.length - 1;
          const isActive = activeIndex === i;

          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onClick={() =>
                setSelectedIndex(selectedIndex === i ? null : i)
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 8px",
                borderRadius: "4px",
                cursor: "pointer",
                background: isActive
                  ? "rgba(255,255,255,0.04)"
                  : "transparent",
                opacity:
                  activeIndex !== null && !isActive ? 0.4 : 1,
                transition:
                  "opacity 0.25s ease, background 0.25s ease",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "2px",
                  background: isUsable
                    ? `repeating-linear-gradient(-45deg, ${seg.color}, ${seg.color} 2px, #161b22 2px, #161b22 4px)`
                    : seg.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "12px", color: "#c9d1d9" }}>
                {seg.label}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#8b949e",
                  marginLeft: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                {formatTokens(seg.tokens)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "20px",
          paddingTop: "16px",
          borderTop: "1px solid #21262d",
          fontSize: "12px",
          color: "#8b949e",
          lineHeight: "1.6",
        }}
      >
        Measured from a real AI coding session — fresh start, zero
        messages sent. Your split will vary by tool, model, and project
        config. The point:{" "}
        <span style={{ color: "#f0f6fc" }}>
          nearly 30% of your context window is gone before you start
          working.
        </span>{" "}
        Now add conversation history, pasted files, and model responses.
        It fills faster than you think.
      </div>
    </div>
  );
}
