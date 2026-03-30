import { useEffect, useState } from "react";

const NODES = [
  { title: "Your Files", files: ["session-start.md", "current-sprint.md"] },
  { title: "Planning Chat", sub: "Claude · ChatGPT · any web AI" },
  { title: "Ticket", files: ["TASK-001.md"], sub: "one task, ordered in the sprint" },
  { title: "Coding Agent", sub: "Claude Code · Cursor · Codex" },
  { title: "Updated Files", files: ["session-start.md", "current-sprint.md"], foot: "✓ ready for next session" },
];

const EDGES = ["reads files", "updates sprint", "implements", "updates"];

function FileChip({ name }) {
  return (
    <span
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        color: "#8b9bb4",
        background: "rgba(30, 41, 59, 0.5)",
        padding: "3px 9px",
        borderRadius: 5,
        border: "1px solid rgba(148, 163, 184, 0.06)",
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </span>
  );
}

function Node({ title, sub, foot, files, active }) {
  return (
    <div
      className="wf-node"
      style={{
        padding: "14px 16px",
        borderRadius: 10,
        border: `1px solid ${active ? "#4ade80" : "rgba(148, 163, 184, 0.1)"}`,
        background: active ? "rgba(74, 222, 128, 0.04)" : "rgba(15, 23, 42, 0.6)",
        transform: active ? "scale(1.03)" : "scale(1)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        textAlign: "center",
      }}
    >
      {title && (
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: active ? "#f1f5f9" : "#e2e8f0",
            letterSpacing: "-0.01em",
            marginBottom: files ? 6 : 0,
            transition: "color 0.5s ease",
          }}
        >
          {title}
        </div>
      )}
      {files && (
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
          {files.map((f) => (
            <FileChip key={f} name={f} />
          ))}
        </div>
      )}
      {sub && (
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "#546478",
            marginTop: 6,
          }}
        >
          {sub}
        </div>
      )}
      {foot && (
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "#4ade80",
            marginTop: 8,
            opacity: 0.75,
          }}
        >
          {foot}
        </div>
      )}
    </div>
  );
}

function Arrow({ label, active }) {
  const color = active ? "#4ade80" : "#2a3444";
  const textColor = active ? "#4ade80" : "#475569";

  return (
    <div className="wf-arrow">
      {/* Horizontal arrow (desktop) */}
      <div
        className="wf-arrow-h"
        style={{
          flexDirection: "column",
          alignItems: "center",
          width: 64,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div
            style={{
              flex: 1,
              height: 0,
              borderTop: `1.5px solid ${color}`,
              transition: "border-color 0.5s ease",
            }}
          />
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: `7px solid ${color}`,
              transition: "border-left-color 0.5s ease",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            color: textColor,
            marginTop: 6,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            transition: "color 0.5s ease",
          }}
        >
          {label}
        </div>
      </div>

      {/* Vertical arrow (mobile) */}
      <div
        className="wf-arrow-v"
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 40,
          gap: 12,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: 0,
              height: 14,
              borderLeft: `1.5px solid ${color}`,
              transition: "border-color 0.5s ease",
            }}
          />
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: `7px solid ${color}`,
              transition: "border-top-color 0.5s ease",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: textColor,
            letterSpacing: "0.02em",
            transition: "color 0.5s ease",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

export default function WorkflowDiagram() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const t = setTimeout(() => setActive(0), 800);
    const i = setInterval(() => setActive((p) => (p + 1) % 5), 2000);
    return () => {
      clearTimeout(t);
      clearInterval(i);
    };
  }, []);

  return (
    <>
      <style>{`
        .wf-flow {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
        }
        .wf-node {
          width: 100%;
          max-width: 300px;
        }
        .wf-arrow-h { display: none !important; }
        .wf-arrow-v { display: flex !important; }

        @media (min-width: 841px) {
          .wf-flow {
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }
          .wf-node {
            width: 168px;
            max-width: 168px;
            flex: 1 1 168px;
            min-width: 0;
          }
          .wf-arrow {
            flex: 0 1 64px;
            min-width: 40px;
          }
          .wf-arrow-h { display: flex !important; }
          .wf-arrow-v { display: none !important; }
        }
      `}</style>

      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          background: "linear-gradient(180deg, #0c0f1a 0%, #111827 100%)",
          borderRadius: 14,
          padding: "28px 20px 20px",
          margin: "0 auto",
          border: "1px solid rgba(148, 163, 184, 0.05)",
          maxWidth: 980,
          overflow: "hidden",
        }}
      >
        <div className="wf-flow">
          {NODES.map((node, i) => (
            <React.Fragment key={i}>
              <Node {...node} active={i === active} />
              {i < EDGES.length && <Arrow label={EDGES[i]} active={i === active} />}
            </React.Fragment>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              opacity: 0.6,
            }}
          >
            <span style={{ fontFamily: "'DM Mono', monospace", color: "#334155", fontSize: 14 }}>
              ↺
            </span>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                color: "#334155",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              repeat
            </span>
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              color: "#3e4a5c",
              marginTop: 10,
              letterSpacing: "0.01em",
            }}
          >
            Chat history disappears between sessions. Files don't.
          </div>
        </div>
      </div>
    </>
  );
}
