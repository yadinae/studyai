"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleTutorials } from "@/content/tutorials/sample-tutorials";
import { useFavorites } from "@/lib/favorites";
import { Heart, Share2 } from "lucide-react";

export default function TutorialDetailClient() {
  const params = useParams();
  const tutorialId = params.id as string;
  const tutorial = sampleTutorials.find((t) => t.id === tutorialId);
  const { toggle, isFav } = useFavorites();
  const isFavorite = isFav(tutorialId, "tutorial");

  if (!tutorial) {
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
          <h1 className="text-2xl font-bold mb-4">教程不存在</h1>
          <p className="text-muted-foreground mb-8">该教程可能已被删除或链接错误</p>
          <Link href="/tutorials">
            <Button>返回教程中心</Button>
          </Link>
        </div>
      </div>
    );
  }

  // 获取当前教程在列表中的索引
  const currentIndex = sampleTutorials.findIndex((t) => t.id === tutorialId);
  const prevTutorial = currentIndex > 0 ? sampleTutorials[currentIndex - 1] : null;
  const nextTutorial = currentIndex < sampleTutorials.length - 1 ? sampleTutorials[currentIndex + 1] : null;

  // 相关教程（同级别）
  const relatedTutorials = sampleTutorials
    .filter((t) => t.level === tutorial.level && t.id !== tutorial.id)
    .slice(0, 3);

  // 简单的 Markdown 渲染（支持标题、列表、代码块、表格）
  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let inTable = false;
    let tableRows: string[][] = [];

    lines.forEach((line, index) => {
      // 代码块处理
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${index}`} className="bg-muted rounded-lg p-4 overflow-x-auto text-sm font-mono my-4">
              <code>{codeContent}</code>
            </pre>
          );
          codeContent = '';
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }

      // 表格处理
      if (line.startsWith('|')) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
        if (!line.includes('---')) {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        // 渲染表格
        if (tableRows.length > 0) {
          elements.push(
            <div key={`table-${index}`} className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-border">
                <thead>
                  <tr>
                    {tableRows[0].map((cell, i) => (
                      <th key={i} className="border border-border px-4 py-2 bg-muted text-left font-semibold">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.slice(1).map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} className="border border-border px-4 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        tableRows = [];
        inTable = false;
      }

      // 标题处理
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-lg font-semibold mt-6 mb-3">
            {line.slice(4)}
          </h3>
        );
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-xl font-bold mt-8 mb-4 border-b pb-2">
            {line.slice(3)}
          </h2>
        );
        return;
      }
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-2xl font-bold mb-6">
            {line.slice(2)}
          </h1>
        );
        return;
      }

      // 列表处理
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={index} className="ml-4 mb-1">
            {line.slice(2)}
          </li>
        );
        return;
      }
      if (line.match(/^\d+\. /)) {
        elements.push(
          <li key={index} className="ml-4 mb-1 list-decimal">
            {line.replace(/^\d+\. /, '')}
          </li>
        );
        return;
      }

      // 空行
      if (line.trim() === '') {
        return;
      }

      // 普通段落
      elements.push(
        <p key={index} className="mb-4 leading-relaxed">
          {line}
        </p>
      );
    });

    return elements;
  };

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
            <Link href="/prompts" className="text-muted-foreground hover:text-foreground transition-colors">
              提示词库
            </Link>
            <Link href="/tutorials" className="text-foreground font-medium">
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
            <Link href="/tutorials" className="hover:text-foreground">教程中心</Link>
            <span>/</span>
            <span className="text-foreground">{tutorial.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left: Tutorial Content */}
          <div className="lg:col-span-3">
            <article>
              {/* Article Header */}
              <header className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge
                    variant={
                      tutorial.level === "入门"
                        ? "default"
                        : tutorial.level === "进阶"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {tutorial.level}
                  </Badge>
                  {tutorial.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl font-bold mb-4">{tutorial.title}</h1>
                <p className="text-lg text-muted-foreground">{tutorial.description}</p>
              <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span>👤</span>
                  <span>{tutorial.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>📖</span>
                  <span>{tutorial.readTime} 分钟阅读</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>👁</span>
                  <span>{tutorial.views} 次阅读</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>📅</span>
                  <span>{tutorial.createdAt}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggle({
                    id: tutorial.id,
                    type: "tutorial",
                    title: tutorial.title,
                  })}
                >
                  <Heart className={`h-4 w-4 mr-1 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  {isFavorite ? "已收藏" : "收藏"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("链接已复制到剪贴板");
                  }}
                >
                  <Share2 className="h-4 w-4 mr-1" /> 分享
                </Button>
              </div>
              </header>

              {/* Article Content */}
              <div className="prose prose-slate max-w-none">
                {renderMarkdown(tutorial.content)}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-12 pt-6 border-t">
                {prevTutorial ? (
                  <Link href={`/tutorials/${prevTutorial.id}`}>
                    <Button variant="outline">
                      ← 上一篇：{prevTutorial.title}
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}
                {nextTutorial ? (
                  <Link href={`/tutorials/${nextTutorial.id}`}>
                    <Button variant="outline">
                      下一篇：{nextTutorial.title} →
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </article>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Table of Contents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📚 目录</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2 text-sm">
                  {tutorial.content.split('\n')
                    .filter(line => line.startsWith('## '))
                    .map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.slice(3).toLowerCase().replace(/\s+/g, '-')}`}
                        className="block text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {heading.slice(3)}
                      </a>
                    ))}
                </nav>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📊 学习进度</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  第 {currentIndex + 1} / {sampleTutorials.length} 篇
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${((currentIndex + 1) / sampleTutorials.length) * 100}%` }}
                  />
                </div>
                <Link href="/tutorials">
                  <Button variant="outline" className="w-full">
                    查看全部教程
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Related Tutorials */}
            {relatedTutorials.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">相关教程</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {relatedTutorials.map((related) => (
                    <Link
                      key={related.id}
                      href={`/tutorials/${related.id}`}
                      className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="font-medium text-sm mb-1">{related.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {related.readTime} 分钟 · {related.views} 次阅读
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Practice */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 实践练习</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  学以致用，查看相关提示词进行练习
                </p>
                <Link href="/prompts">
                  <Button className="w-full">
                    前往提示词库
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
