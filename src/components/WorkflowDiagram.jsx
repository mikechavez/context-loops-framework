import { useEffect, useMemo, useState } from "react";

const EDGES = [
  { label: "reads files" },
  { label: "updates sprint" },
  { label: "implements" },
  { label: "updates" },
];

function useIsDesktop(bp = 768) {
  const [d, setD] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${bp}px)`);
    const cb = (e) => setD(e.matches);
    setD(mq.matches);
    mq.addEventListener?.("change", cb);
    return () => mq.removeEventListener?.("change", cb);
  }, [bp]);
  return d;
}

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

function Node({ title, sub, foot, files, active, isDesktop }) {
  return (
    <div
      style={{
        padding: isDesktop ? "12px 14px" : "14px 16px",
        borderRadius: 10,
        border: `1px solid ${active ? "#4ade80" : "rgba(148, 163, 184, 0.1)"}`,
        background: active ? "rgba(74, 222, 128, 0.04)" : "rgba(15, 23, 42, 0.6)",
        transform: active ? "scale(1.02)" : "scale(1)",
        transition: "all 0.45s ease",
        textAlign: "center",
        width: isDesktop ? 170 : "100%",
        maxWidth: isDesktop ? 170 : 300,
        flexShrink: 0,
      }}
    >
      {title && (
        <div
          style={{
            fontSize: isDesktop ? 13 : 15,
            fontWeight: 600,
            color: "#e2e8f0",
            letterSpacing: "-0.01em",
            marginBottom: files ? 6 : 0,
          }}
        >
          {title}
        </div>
      )}
      {files && (
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
          {files.map((f) => <FileChip key={f} name={f} />)}
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

function Arrow({ label, active, isDesktop }) {
  const color = active ? "#4ade80" : "#2a3444";
  const textColor = active ? "#4ade80" : "#475569";

  if (isDesktop) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 60,
          flexShrink: 0,
          position: "relative",
        }}
      >
        {/* Horizontal line + head */}
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div
            style={{
              flex: 1,
              height: 0,
              borderTop: `1.5px solid ${color}`,
              transition: "border-color 0.45s ease",
            }}
          />
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: `6px solid ${color}`,
              transition: "border-left-color 0.45s ease",
            }}
          />
        </div>
        {/* Label below */}
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            color: textColor,
            marginTop: 6,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            transition: "color 0.45s ease",
          }}
        >
          {label}
        </div>
      </div>
    );
  }

  // Vertical arrow
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 44,
        position: "relative",
        width: "100%",
        maxWidth: 300,
        justifyContent: "center",
        gap: 12,
      }}
    >
      {/* Vertical line + head */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 0,
            height: 16,
            borderLeft: `1.5px solid ${color}`,
            transition: "border-color 0.45s ease",
          }}
        />
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: `6px solid ${color}`,
            transition: "border-top-color 0.45s ease",
          }}
        />
      </div>
      {/* Label to the right */}
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: textColor,
          letterSpacing: "0.02em",
          transition: "color 0.45s ease",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function WorkflowDiagram() {
  const isDesktop = useIsDesktop(768);
  const [activeNode, setActiveNode] = useState(-1);

  useEffect(() => {
    const timeout = setTimeout(() => setActiveNode(0), 900);
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 5);
    }, 2200);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  // Arrow highlights when its source node is active
  const activeEdge = useMemo(() => {
    if (activeNode < 0 || activeNode >= EDGES.length) return -1;
    return activeNode;
  }, [activeNode]);

  const nodes = [
    { title: "Your Files", files: ["session-start.md", "current-sprint.md"] },
    { title: "Planning Chat", sub: "Claude · ChatGPT · any web AI" },
    { title: "Ticket", files: ["TASK-001.md"], sub: "one task, ordered in the sprint" },
    { title: "Coding Agent", sub: "Claude Code · Cursor · Codex" },
    { title: "Updated Files", files: ["session-start.md", "current-sprint.md"], foot: "✓ ready for next session" },
  ];

  return (
    <div
      style={{
        fontFamily: "'Outfit', sans-serif",
        background: "linear-gradient(180deg, #0c0f1a 0%, #111827 100%)",
        borderRadius: 14,
        padding: isDesktop ? "28px 24px 20px" : "24px 18px 18px",
        maxWidth: isDesktop ? 980 : 480,
        margin: "0 auto",
        border: "1px solid rgba(148, 163, 184, 0.05)",
      }}
    >
      {/* Flow */}
      <div
        style={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {nodes.map((node, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: isDesktop ? "row" : "column",
              alignItems: "center",
            }}
          >
            <Node {...node} active={i === activeNode} isDesktop={isDesktop} />
            {i < EDGES.length && (
              <Arrow
                label={EDGES[i].label}
                active={i === activeEdge}
                isDesktop={isDesktop}
              />
            )}
          </div>
        ))}
      </div>

      {/* Repeat + tagline */}
      <div style={{ textAlign: "center", marginTop: isDesktop ? 16 : 10 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            opacity: 0.6,
          }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", color: "#334155", fontSize: 14 }}>↺</span>
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
  );
}
