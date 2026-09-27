import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Explorer — find the next thing to build",
  description: "A field guide to AI models, prompts, templates, projects, and open-source tools.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
