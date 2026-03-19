"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Wrench, Sparkles, Zap, Copy, Check } from "lucide-react";

// 工具列表
const tools = [
  {
    id: "prompt-optimizer",
    name: "提示词优化器",
    description: "输入你的原始提示词，AI帮你优化成更专业、更有效的版本",
    icon: <Sparkles className="h-6 w-6" />,
    status: "available",
    tags: ["优化", "增强"],
  },
  {
    id: "prompt-generator",
    name: "提示词生成器",
    description: "根据你的需求描述，自动生成专业的提示词模板",
    icon: <Zap className="h-6 w-6" />,
    status: "available",
    tags: ["生成", "创作"],
  },
  {
    id: "prompt-tester",
    name: "提示词测试器",
    description: "测试你的提示词效果，获取改进建议",
    icon: <Wrench className="h-6 w-6" />,
    status: "coming",
    tags: ["测试", "调试"],
  },
];

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleOptimize = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    // 模拟处理
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOutputText(
      `【优化后的提示词】\n\n你是一位专业的${inputText.includes("代码") ? "程序员" : "内容创作者"}。\n\n任务：${inputText}\n\n要求：\n1. 提供详细、专业的输出\n2. 使用清晰的结构和格式\n3. 确保内容准确、实用\n4. 如有必要，提供示例说明\n\n请根据以上要求完成任务。`
    );
    setIsProcessing(false);
  };

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    // 模拟处理
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOutputText(
      `【生成的提示词模板】\n\n你是一位经验丰富的${inputText.includes("写作") ? "写作专家" : inputText.includes("设计") ? "设计师" : "领域专家"}。\n\n## 任务描述\n${inputText}\n\n## 输出要求\n- 格式：结构化输出\n- 风格：专业、清晰\n- 长度：适中\n\n## 注意事项\n- 确保内容准确无误\n- 考虑实际应用场景\n- 提供可操作的建议`
    );
    setIsProcessing(false);
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  const renderToolContent = () => {
    if (!activeTool) {
      return (
        <div className="text-center py-12">
          <Wrench className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">选择一个工具开始使用</h3>
          <p className="text-muted-foreground">点击左侧工具卡片，体验AI提示词工具</p>
        </div>
      );
    }

    const tool = tools.find((t) => t.id === activeTool);
    if (!tool) return null;

    if (tool.status === "coming") {
      return (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🚧</div>
          <h3 className="text-lg font-medium mb-2">工具开发中</h3>
          <p className="text-muted-foreground mb-4">该工具正在紧张开发中，敬请期待</p>
          <Button onClick={() => setActiveTool(null)}>返回工具列表</Button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          {tool.icon}
          <div>
            <h3 className="text-lg font-medium">{tool.name}</h3>
            <p className="text-sm text-muted-foreground">{tool.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              {activeTool === "prompt-optimizer" ? "输入你的提示词" : "描述你的需求"}
            </label>
            <Textarea
              placeholder={
                activeTool === "prompt-optimizer"
                  ? "粘贴你的提示词，我们将帮你优化..."
                  : "描述你需要什么类型的提示词..."
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <Button
            onClick={activeTool === "prompt-optimizer" ? handleOptimize : handleGenerate}
            disabled={!inputText.trim() || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                处理中...
              </>
            ) : activeTool === "prompt-optimizer" ? (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                优化提示词
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                生成提示词
              </>
            )}
          </Button>

          {outputText && (
            <div className="relative">
              <label className="text-sm font-medium mb-2 block">结果</label>
              <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap border min-h-[150px]">
                {outputText}
              </div>
              <Button
                onClick={handleCopy}
                variant="secondary"
                size="sm"
                className="absolute top-8 right-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    复制
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
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
            <Link href="/tools" className="text-foreground font-medium">
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

      {/* Page Header */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">提示词工具</h1>
          <p className="text-muted-foreground text-lg">
            实用的AI提示词辅助工具，帮助你优化、生成和测试提示词
          </p>
        </div>
      </section>

      {/* Tools Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tool List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-lg font-semibold mb-4">可用工具</h2>
              {tools.map((tool) => (
                <Card
                  key={tool.id}
                  className={`cursor-pointer transition-all ${
                    activeTool === tool.id ? "ring-2 ring-primary" : "hover:shadow-md"
                  }`}
                  onClick={() => setActiveTool(tool.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          {tool.icon}
                        </div>
                        <div>
                          <CardTitle className="text-base">{tool.name}</CardTitle>
                          {tool.status === "coming" && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              即将上线
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm line-clamp-2">
                      {tool.description}
                    </CardDescription>
                    <div className="flex gap-2 mt-3">
                      {tool.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tool Workspace */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardContent className="p-6">{renderToolContent()}</CardContent>
              </Card>
            </div>
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
