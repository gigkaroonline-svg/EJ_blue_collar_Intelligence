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
  title: "RojMitra by EarlyJobs | Village-Level Workforce Intelligence for India",
  description:
    "RojMitra maps, verifies and connects India's workforce at the grassroots. Village-level labour mapping, worker experience, availability and migration intelligence, so employers can finally see and reach nearby talent.",
  openGraph: {
    title: "RojMitra by EarlyJobs | Village-Level Workforce Intelligence for India",
    description:
      "RojMitra maps, verifies and connects India's workforce at the grassroots. Village-level labour mapping, worker experience, availability and migration intelligence, so employers can finally see and reach nearby talent.",
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
