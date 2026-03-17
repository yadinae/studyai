"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleTutorials, tutorialCategories } from "@/content/tutorials/sample-tutorials";

export default function TutorialsPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  // 过滤教程
  const filteredTutorials = sampleTutorials.filter((tutorial) => {
    return !selectedLevel || tutorial.level === selectedLevel;
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

      {/* Page Header */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">教程中心</h1>
          <p className="text-muted-foreground text-lg">
            系统化的提示词学习教程，从入门到精通
          </p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-8 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4">
            {tutorialCategories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all ${
                  selectedLevel === category.name
                    ? "ring-2 ring-primary"
                    : "hover:shadow-md"
                }`}
                onClick={() =>
                  setSelectedLevel(
                    selectedLevel === category.name ? null : category.name
                  )
                }
              >
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {category.count} 篇教程
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Level Filter */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-2">
            <Button
              variant={selectedLevel === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLevel(null)}
            >
              全部
            </Button>
            <Button
              variant={selectedLevel === "入门" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLevel("入门")}
            >
              入门教程
            </Button>
            <Button
              variant={selectedLevel === "进阶" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLevel("进阶")}
            >
              进阶教程
            </Button>
            <Button
              variant={selectedLevel === "场景" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLevel("场景")}
            >
              场景教程
            </Button>
          </div>
        </div>
      </section>

      {/* Tutorials List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-sm text-muted-foreground">
            共 {filteredTutorials.length} 篇教程
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial, index) => (
              <Link key={tutorial.id} href={`/tutorials/${tutorial.id}`}>
                <Card className="card-hover h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
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
                      <span className="text-xs text-muted-foreground">
                        第 {index + 1} 篇
                      </span>
                    </div>
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {tutorial.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>📖 {tutorial.readTime} 分钟</span>
                        <span>👁 {tutorial.views} 次</span>
                      </div>
                      <span>{tutorial.author}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredTutorials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">该分类暂无教程</p>
              <Button variant="link" onClick={() => setSelectedLevel(null)}>
                查看全部教程
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">学习路径</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-4">
                  1
                </div>
                <CardTitle>入门阶段</CardTitle>
                <CardDescription>
                  了解提示词基础概念，掌握基本结构
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ 什么是提示词</li>
                  <li>✓ 提示词基本结构</li>
                  <li>✓ 清晰指令技巧</li>
                  <li>✓ 角色设定方法</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-4">
                  2
                </div>
                <CardTitle>进阶阶段</CardTitle>
                <CardDescription>
                  深入技巧，提升提示词质量
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 思维链技巧</li>
                  <li>• 少样本学习</li>
                  <li>• 模板设计</li>
                  <li>• 效果评估</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-4">
                  3
                </div>
                <CardTitle>实战应用</CardTitle>
                <CardDescription>
                  在实际场景中应用提示词
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 写作场景</li>
                  <li>• 编程场景</li>
                  <li>• 办公场景</li>
                  <li>• 设计场景</li>
                </ul>
              </CardContent>
            </Card>
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
