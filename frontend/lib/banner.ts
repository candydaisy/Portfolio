import figlet from "figlet";
import ansiShadow from "figlet/importable-fonts/ANSI Shadow.js";

figlet.parseFont("ANSI Shadow", ansiShadow);

/** Render text as an ANSI Shadow FIGlet banner. Runs at build time on the server. */
export function renderBanner(text: string): string {
  return figlet.textSync(text.toUpperCase(), { font: "ANSI Shadow" });
}
