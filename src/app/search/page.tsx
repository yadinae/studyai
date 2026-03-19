"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft, X } from "lucide-react";
import { samplePrompts } from "@/content/prompts/sample-prompts";
import { sampleTutorials } from "@/content/tutorials/sample-tutorials";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "prompt" | "tutorial";
  tags?: string[];
  category?: string;
  level?: string;
  href: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 执行搜索
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const lowerQuery = query.toLowerCase();

    // 搜索提示词
    const promptResults: SearchResult[] = samplePrompts
      .filter(
        (prompt) =>
          prompt.title.toLowerCase().includes(lowerQuery) ||
          prompt.description.toLowerCase().includes(lowerQuery) ||
          prompt.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
          prompt.content.toLowerCase().includes(lowerQuery)
      )
      .map((prompt) => ({
        id: prompt.id,
        title: prompt.title,
        description: prompt.description,
        type: "prompt",
        tags: prompt.tags,
        category: prompt.category,
        href: `/prompts/${prompt.id}`,
      }));

    // 搜索教程
    const tutorialResults: SearchResult[] = sampleTutorials
      .filter(
        (tutorial) =>
          tutorial.title.toLowerCase().includes(lowerQuery) ||
          tutorial.description.toLowerCase().includes(lowerQuery) ||
          tutorial.content.toLowerCase().includes(lowerQuery) ||
          tutorial.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      )
      .map((tutorial) => ({
        id: tutorial.id,
        title: tutorial.title,
        description: tutorial.description,
        type: "tutorial",
        level: tutorial.level,
        tags: tutorial.tags,
        href: `/tutorials/${tutorial.id}`,
      }));

    setResults([...promptResults, ...tutorialResults]);
    setIsSearching(false);
  };

  // 初始搜索
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  // 处理搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
    // 更新URL
    const url = new URL(window.location.href);
    url.searchParams.set("q", searchQuery);
    window.history.pushState({}, "", url);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResults([]);
    const url = new URL(window.location.href);
    url.searchParams.delete("q");
    window.history.pushState({}, "", url);
  };

  const promptResults = results.filter((r) => r.type === "prompt");
  const tutorialResults = results.filter((r) => r.type === "tutorial");

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
            <Link
              href="/prompts"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              提示词库
            </Link>
            <Link
              href="/tutorials"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              教程中心
            </Link>
            <Link
              href="/tools"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              提示词工具
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              登录
            </Button>
            <Button size="sm">开始学习</Button>
          </div>
        </div>
      </header>

      {/* Search Header */}
      <section className="py-12 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回首页
            </Link>
            <h1 className="text-3xl font-bold mb-6">搜索结果</h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索提示词、教程..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-6 text-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </form>

            {/* Search Stats */}
            {searchQuery && (
              <div className="mt-4 text-sm text-muted-foreground">
                搜索 &quot;{searchQuery}&quot; 找到 {results.length} 个结果
                {results.length > 0 && (
                  <span className="ml-2">
                    （{promptResults.length} 个提示词，{tutorialResults.length} 个教程）
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {!searchQuery ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">输入关键词开始搜索</h3>
                <p className="text-muted-foreground">
                  支持搜索提示词标题、描述、标签和内容
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium mb-2">未找到相关结果</h3>
                <p className="text-muted-foreground mb-4">
                  尝试使用其他关键词或检查拼写
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" onClick={clearSearch}>
                    清除搜索
                  </Button>
                  <Link href="/prompts">
                    <Button>浏览提示词库</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Prompt Results */}
                {promptResults.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <span>📝</span>
                      提示词 ({promptResults.length})
                    </h2>
                    <div className="space-y-4">
                      {promptResults.map((result) => (
                        <Link key={result.id} href={result.href}>
                          <Card className="card-hover">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-lg">{result.title}</CardTitle>
                                <Badge variant="secondary">{result.category}</Badge>
                              </div>
                              <CardDescription className="line-clamp-2">
                                {result.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex gap-2 flex-wrap">
                                {result.tags?.slice(0, 4).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tutorial Results */}
                {tutorialResults.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <span>📚</span>
                      教程 ({tutorialResults.length})
                    </h2>
                    <div className="space-y-4">
                      {tutorialResults.map((result) => (
                        <Link key={result.id} href={result.href}>
                          <Card className="card-hover">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-lg">{result.title}</CardTitle>
                                <Badge
                                  variant={
                                    result.level === "入门"
                                      ? "default"
                                      : result.level === "进阶"
                                      ? "secondary"
                                      : "outline"
                                  }
                                >
                                  {result.level}
                                </Badge>
                              </div>
                              <CardDescription className="line-clamp-2">
                                {result.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex gap-2 flex-wrap">
                                {result.tags?.slice(0, 4).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
      <SearchContent />
    </Suspense>
  );
}
