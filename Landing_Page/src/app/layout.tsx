import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RojMitra | Mapping India’s Workforce",
  description:
    "RojMitra is India’s workforce intelligence and labour mapping infrastructure. We map, verify and connect workers across districts, skills and industries, so employers can plan better and workers can be seen.",
  openGraph: {
    title: "RojMitra | Mapping India’s Workforce",
    description:
      "Workforce intelligence and labour mapping infrastructure from EarlyJobs, mapping India’s workforce, one district at a time.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
