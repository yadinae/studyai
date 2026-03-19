import type { Metadata } from "next";
import { sampleTutorials } from "@/content/tutorials/sample-tutorials";
import TutorialDetailClient from "./TutorialDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tutorial = sampleTutorials.find((t) => t.id === id);

  if (!tutorial) {
    return {
      title: "教程不存在 | studyai.ltd",
      description: "该教程可能已被删除或链接错误",
    };
  }

  return {
    title: `${tutorial.title} - ${tutorial.level}教程`,
    description: tutorial.description,
    keywords: [...tutorial.tags, "提示词教程", "Prompt Engineering", tutorial.level],
    authors: [{ name: tutorial.author }],
    openGraph: {
      title: `${tutorial.title} | studyai.ltd`,
      description: tutorial.description,
      type: "article",
      authors: [tutorial.author],
      publishedTime: tutorial.createdAt,
      tags: tutorial.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${tutorial.title} | studyai.ltd`,
      description: tutorial.description,
    },
  };
}

export default async function TutorialDetailPage({ params }: Props) {
  const { id } = await params;
  const tutorial = sampleTutorials.find((t) => t.id === id);

  if (!tutorial) {
    return null;
  }

  return <TutorialDetailClient />;
}
