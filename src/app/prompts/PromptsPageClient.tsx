"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { samplePrompts, categories } from "@/content/prompts/sample-prompts";

function PromptsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);

  // 同步 URL 参数
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // 过滤提示词
  const filteredPrompts = samplePrompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !selectedCategory || prompt.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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

      {/* Page Header */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">提示词库</h1>
          <p className="text-muted-foreground text-lg">
            精选高质量提示词模板，覆盖写作、设计、编程、办公等多个场景
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <Input
                type="search"
                placeholder="搜索提示词..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                全部
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.icon} {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prompts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-sm text-muted-foreground">
            共找到 {filteredPrompts.length} 个提示词
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((prompt) => (
              <Link key={prompt.id} href={`/prompts/${prompt.id}`}>
                <Card className="card-hover h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{prompt.title}</CardTitle>
                      <Badge variant="secondary" className="shrink-0">
                        {prompt.category}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {prompt.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">
                        {prompt.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>❤️</span>
                        <span>{prompt.likes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredPrompts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">没有找到匹配的提示词</p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
              >
                清除筛选条件
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 studyai.ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function PromptsPageClient() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
      <PromptsContent />
    </Suspense>
  );
}
