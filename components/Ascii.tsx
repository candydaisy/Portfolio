import type { ReactNode } from "react";

const FILL = "─".repeat(240);

type AsciiBoxProps = {
  title: ReactNode;
  meta?: string;
  id?: string;
  level?: 2 | 3;
  as?: "section" | "article";
  className?: string;
  children: ReactNode;
};

/**
 * A box drawn with box-drawing characters. The top and bottom rows are real
 * text; the side walls are 1px CSS borders placed at the centre of the first
 * and last character cell so they meet the ┌ ┐ └ ┘ corners exactly.
 */
export function AsciiBox({
  title,
  meta,
  id,
  level = 2,
  as = "section",
  className,
  children,
}: AsciiBoxProps) {
  const Tag = as;
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <Tag id={id} className={["ascii-box", className].filter(Boolean).join(" ")}>
      <Heading className="box-row box-head">
        <span aria-hidden="true">┌─[ </span>
        <span className="box-title">{title}</span>
        <span aria-hidden="true"> ]</span>
        <span className="box-fill" aria-hidden="true">
          {FILL}
        </span>
        {meta && (
          <span className="box-meta-wrap">
            <span aria-hidden="true">[ </span>
            <span className="box-meta">{meta}</span>
            <span aria-hidden="true"> ]─</span>
          </span>
        )}
        <span aria-hidden="true">┐</span>
      </Heading>
      <div className="box-body">{children}</div>
      <div className="box-row" aria-hidden="true">
        <span>└</span>
        <span className="box-fill">{FILL}</span>
        <span>┘</span>
      </div>
    </Tag>
  );
}

/*
 * The banner is drawn as SVG shapes, not text. Box-drawing glyphs differ in
 * width between fonts, so text art falls apart whenever the browser uses a
 * fallback font. Each character becomes one 6×12 cell (a 1:2 terminal cell).
 */
const CW = 6;
const CH = 12;
const X1 = 2; // double-line positions inside a cell
const X2 = 4;
const Y1 = 4;
const Y2 = 8;

function cellPath(ch: string, x: number, y: number): string {
  const h = (yy: number, a: number, b: number) => `M${x + a} ${y + yy}H${x + b}`;
  const v = (xx: number, a: number, b: number) => `M${x + xx} ${y + a}V${y + b}`;
  switch (ch) {
    case "═":
      return h(Y1, 0, CW) + h(Y2, 0, CW);
    case "║":
      return v(X1, 0, CH) + v(X2, 0, CH);
    case "╔":
      return h(Y1, X1, CW) + v(X1, Y1, CH) + h(Y2, X2, CW) + v(X2, Y2, CH);
    case "╗":
      return h(Y1, 0, X2) + v(X2, Y1, CH) + h(Y2, 0, X1) + v(X1, Y2, CH);
    case "╚":
      return v(X1, 0, Y2) + h(Y2, X1, CW) + v(X2, 0, Y1) + h(Y1, X2, CW);
    case "╝":
      return v(X2, 0, Y2) + h(Y2, 0, X2) + v(X1, 0, Y1) + h(Y1, 0, X1);
    default:
      return "";
  }
}

export function AsciiBanner({ art, label }: { art: string; label: string }) {
  const lines = art.replace(/\s+$/, "").split("\n");
  const cols = Math.max(...lines.map((line) => [...line].length));

  const blocks: string[] = [];
  let strokes = "";
  lines.forEach((line, row) => {
    const chars = [...line];
    let run = -1;
    chars.concat(" ").forEach((ch, col) => {
      if (ch === "█") {
        if (run < 0) run = col;
        return;
      }
      if (run >= 0) {
        // merge horizontal runs of █ into one rect to avoid hairline seams
        blocks.push(`M${run * CW} ${row * CH}h${(col - run) * CW}v${CH + 0.2}h${-(col - run) * CW}z`);
        run = -1;
      }
      strokes += cellPath(ch, col * CW, row * CH);
    });
  });

  return (
    <svg
      className="ascii-banner"
      viewBox={`0 0 ${cols * CW} ${lines.length * CH}`}
      role="img"
      aria-label={label}
      style={{ ["--cols" as string]: cols }}
    >
      <path className="banner-shadow" d={strokes} />
      <path className="banner-fill" d={blocks.join("")} />
    </svg>
  );
}
