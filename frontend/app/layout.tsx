import type { Metadata } from "next";
import { IBM_Plex_Mono, Sarabun } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const terminal = IBM_Plex_Mono({
  variable: "--font-terminal",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const thai = Sarabun({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "M.6 Portfolio Template",
  description:
    "Bilingual ASCII-art portfolio template for M.6 students applying to universities.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${terminal.variable} ${thai.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
