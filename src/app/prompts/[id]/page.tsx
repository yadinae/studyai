import type { Metadata } from "next";
import { samplePrompts, categories } from "@/content/prompts/sample-prompts";
import PromptDetailClient from "./PromptDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const prompt = samplePrompts.find((p) => p.id === id);

  if (!prompt) {
    return {
      title: "提示词不存在 | studyai.ltd",
      description: "该提示词可能已被删除或链接错误",
    };
  }

  const category = categories.find((c) => c.id === prompt.category);
  const categoryName = category ? category.name : "提示词";

  return {
    title: `${prompt.title} - ${categoryName}`,
    description: prompt.description,
    keywords: [...prompt.tags, "提示词", "Prompt Engineering", categoryName],
    openGraph: {
      title: `${prompt.title} | studyai.ltd`,
      description: prompt.description,
      type: "article",
      authors: [prompt.author],
      tags: prompt.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${prompt.title} | studyai.ltd`,
      description: prompt.description,
    },
  };
}

export default async function PromptDetailPage({ params }: Props) {
  const { id } = await params;
  const prompt = samplePrompts.find((p) => p.id === id);

  if (!prompt) {
    return null;
  }

  return <PromptDetailClient />;
}
