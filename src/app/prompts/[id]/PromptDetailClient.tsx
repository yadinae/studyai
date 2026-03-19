"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { samplePrompts, categories } from "@/content/prompts/sample-prompts";
import { useFavorites } from "@/lib/favorites";
import { useState } from "react";
import { Heart, Share2, Copy, Check } from "lucide-react";

export default function PromptDetailClient() {
  const params = useParams();
  const promptId = params.id as string;
  const prompt = samplePrompts.find((p) => p.id === promptId);
  const [copied, setCopied] = useState(false);
  const { toggle, isFav } = useFavorites();
  const isFavorite = isFav(promptId, "prompt");

  if (!prompt) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              <span className="font-bold text-xl">studyai.ltd</span>
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">提示词不存在</h1>
          <p className="text-muted-foreground mb-8">该提示词可能已被删除或链接错误</p>
          <Link href="/prompts">
            <Button>返回提示词库</Button>
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.id === prompt.category);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  // 相关提示词（同分类）
  const relatedPrompts = samplePrompts
    .filter((p) => p.category === prompt.category && p.id !== prompt.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <span className="font-bold text-xl">studyai.ltd</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/prompts" className="text-foreground font-medium">
              提示词库
            </Link>
            <Link href="/tutorials" className="text-muted-foreground hover:text-foreground transition-colors">
              教程中心
            </Link>
            <Link href="/tools" className="text-muted-foreground hover:text-foreground transition-colors">
              提示词工具
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              登录
            </Button>
            <Button size="sm">
              开始学习
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">首页</Link>
            <span>/</span>
            <Link href="/prompts" className="hover:text-foreground">提示词库</Link>
            <span>/</span>
            <span className="text-foreground">{prompt.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Prompt Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {category && (
                        <Badge variant="secondary">
                          {category.icon} {category.name}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl">{prompt.title}</CardTitle>
                  </div>
                </div>
                <p className="text-muted-foreground mt-2">{prompt.description}</p>
              </CardHeader>
              <CardContent>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {prompt.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Prompt Content */}
                <div className="relative">
                  <div className="bg-muted/50 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap border">
                    {prompt.content}
                  </div>
                  <Button
                    onClick={handleCopy}
                    className="absolute top-4 right-4"
                    variant={copied ? "default" : "secondary"}
                    size="sm"
                  >
                    {copied ? "✓ 已复制" : "📋 复制"}
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span>❤️</span>
                    <span>{prompt.likes} 人喜欢</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📊</span>
                    <span>{prompt.uses} 次使用</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>👤</span>
                    <span>{prompt.author}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">💡 使用技巧</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 复制提示词后，直接粘贴到 ChatGPT、Claude 等 AI 工具中使用</li>
                  <li>• 根据你的具体需求，修改提示词中的关键信息</li>
                  <li>• 可以在原提示词基础上添加更多细节和要求</li>
                  <li>• 多次尝试和调整，找到最适合你的版本</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">快速操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
            <Button onClick={handleCopy} className="w-full">
              {copied ? (
                <><Check className="h-4 w-4 mr-2" /> 已复制</>
              ) : (
                <><Copy className="h-4 w-4 mr-2" /> 复制提示词</>
              )}
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => prompt && toggle({
                id: prompt.id,
                type: "prompt",
                title: prompt.title,
              })}
            >
              <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              {isFavorite ? "已收藏" : "收藏"}
            </Button>
            <Button variant="outline" className="w-full" onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("链接已复制到剪贴板");
            }}>
              <Share2 className="h-4 w-4 mr-2" /> 分享
            </Button>
              </CardContent>
            </Card>

            {/* Related Prompts */}
            {relatedPrompts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">相关提示词</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {relatedPrompts.map((related) => (
                    <Link
                      key={related.id}
                      href={`/prompts/${related.id}`}
                      className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="font-medium text-sm mb-1">{related.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">
                        {related.description}
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Learning Path */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">学习路径</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  想系统学习提示词技巧？查看我们的教程中心
                </p>
                <Link href="/tutorials">
                  <Button variant="outline" className="w-full">
                    📚 前往教程中心
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 studyai.ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
