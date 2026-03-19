import type { Metadata } from "next";
import PromptsPageClient from "./PromptsPageClient";

export const metadata: Metadata = {
  title: "提示词库 - 精选高质量AI提示词模板",
  description: "探索精选的AI提示词模板，覆盖写作、设计、编程、办公等多个场景。从入门到精通，找到适合你的提示词。",
  keywords: ["提示词库", "Prompt模板", "AI提示词", "ChatGPT提示词", "Claude提示词", "写作提示词", "编程提示词"],
  openGraph: {
    title: "提示词库 - 精选高质量AI提示词模板 | studyai.ltd",
    description: "探索精选的AI提示词模板，覆盖写作、设计、编程、办公等多个场景。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "提示词库 - 精选高质量AI提示词模板 | studyai.ltd",
    description: "探索精选的AI提示词模板，覆盖写作、设计、编程、办公等多个场景。",
  },
};

export default function PromptsPage() {
  return <PromptsPageClient />;
}
