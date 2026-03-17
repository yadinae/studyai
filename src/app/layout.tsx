import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI提示词学习与实践平台 | studyai.ltd",
  description: "从入门到精通，掌握 Prompt Engineering 技能。提供提示词教程、提示词库、提示词工具，助你成为AI时代的提示词专家。",
  keywords: ["提示词", "Prompt Engineering", "AI", "ChatGPT", "Claude", "提示词教程", "提示词库"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
