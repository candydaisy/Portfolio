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

export function AsciiBanner({ art, label }: { art: string; label: string }) {
  const lines = art.replace(/\s+$/, "").split("\n");
  const cols = Math.max(...lines.map((line) => line.length));
  return (
    <pre
      className="ascii-banner"
      role="img"
      aria-label={label}
      style={{ ["--cols" as string]: cols }}
    >
      {lines.join("\n")}
    </pre>
  );
}
