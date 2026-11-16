import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Sans_Thai } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

// Self-hosted full JetBrains Mono: the Google Fonts subsets omit box-drawing
// characters (─ ┌ ┐ └ ┘ ├ │), which then fall back to a system font with a
// different width and break the ASCII frames.
const jetbrains = localFont({
  variable: "--font-jetbrains",
  src: [
    { path: "./fonts/JetBrainsMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/JetBrainsMono-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

const noto = Noto_Sans_Thai({
  variable: "--font-noto",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Krittikun Wongnin — Portfolio",
  description:
    "Portfolio of Krittikun Wongnin, M.6 Digital Science student at Assumption College Rayong.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${noto.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
