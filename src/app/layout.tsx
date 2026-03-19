import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/components/analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "AI提示词学习与实践平台 | studyai.ltd",
    template: "%s | studyai.ltd",
  },
  description: "从入门到精通，掌握 Prompt Engineering 技能。提供提示词教程、提示词库、提示词工具，助你成为AI时代的提示词专家。",
  keywords: ["提示词", "Prompt Engineering", "AI", "ChatGPT", "Claude", "提示词教程", "提示词库"],
  authors: [{ name: "studyai.ltd" }],
  creator: "studyai.ltd",
  metadataBase: new URL("https://www.studyai.ltd"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://www.studyai.ltd",
    siteName: "studyai.ltd",
    title: "AI提示词学习与实践平台 | studyai.ltd",
    description: "从入门到精通，掌握 Prompt Engineering 技能。提供提示词教程、提示词库、提示词工具，助你成为AI时代的提示词专家。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "studyai.ltd - AI提示词学习与实践平台",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI提示词学习与实践平台 | studyai.ltd",
    description: "从入门到精通，掌握 Prompt Engineering 技能。提供提示词教程、提示词库、提示词工具。",
    images: ["/og-image.png"],
    creator: "@studyai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
