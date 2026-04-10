import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Creative - UI/UX Designer & Developer",
  description:
    "A passionate CSE graduate who loves turning ideas into reality through design and code. Specializing in UI/UX Design, Frontend Development, and n8n Automation.",
  keywords: [
    "Portfolio",
    "UI/UX Designer",
    "Frontend Developer",
    "n8n Automation",
    "React",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "Creative" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Portfolio | Creative - UI/UX Designer & Developer",
    description:
      "UI/UX Designer, Frontend Developer, and n8n Automation Specialist",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
