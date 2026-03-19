import type { Metadata } from "next";
import TutorialsPageClient from "./TutorialsPageClient";

export const metadata: Metadata = {
  title: "教程中心 - 系统化提示词学习教程",
  description: "系统化的提示词学习教程，从入门到精通。涵盖基础概念、进阶技巧、实战应用，助你成为AI提示词专家。",
  keywords: ["提示词教程", "Prompt Engineering教程", "AI教程", "ChatGPT教程", "提示词学习", "AI提示词教学"],
  openGraph: {
    title: "教程中心 - 系统化提示词学习教程 | studyai.ltd",
    description: "系统化的提示词学习教程，从入门到精通。涵盖基础概念、进阶技巧、实战应用。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "教程中心 - 系统化提示词学习教程 | studyai.ltd",
    description: "系统化的提示词学习教程，从入门到精通。涵盖基础概念、进阶技巧、实战应用。",
  },
};

export default function TutorialsPage() {
  return <TutorialsPageClient />;
}
