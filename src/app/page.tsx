import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { samplePrompts, categories } from "@/content/prompts/sample-prompts";
import { sampleTutorials } from "@/content/tutorials/sample-tutorials";

export default function Home() {
  // 获取热门提示词（按点赞数排序，取前6个）
  const hotPrompts = [...samplePrompts].sort((a, b) => b.likes - a.likes).slice(0, 6);
  
  // 获取最新教程（取前3个）
  const latestTutorials = sampleTutorials.slice(0, 3);

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

      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            AI提示词学习与实践平台
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            从入门到精通，掌握 Prompt Engineering 技能
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tutorials">
              <Button size="lg" variant="secondary">
                开始学习
              </Button>
            </Link>
            <Link href="/prompts">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                浏览提示词库
              </Button>
            </Link>
          </div>
          
    {/* Stats - 使用真实数据 */}
    <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
      <div>
        <div className="text-3xl md:text-4xl font-bold">{samplePrompts.length}</div>
        <div className="text-white/80">提示词模板</div>
      </div>
      <div>
        <div className="text-3xl md:text-4xl font-bold">{sampleTutorials.length}</div>
        <div className="text-white/80">精品教程</div>
      </div>
      <div>
        <div className="text-3xl md:text-4xl font-bold">{categories.length}</div>
        <div className="text-white/80">应用场景</div>
      </div>
    </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            探索提示词分类
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const count = samplePrompts.filter(p => p.category === category.id).length;
              return (
                <Link
                  key={category.id}
                  href={`/prompts?category=${category.id}`}
                  className="group"
                >
                  <Card className="card-hover text-center h-full">
                    <CardHeader>
                      <div className="text-4xl mb-2">{category.icon}</div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {count} 个提示词
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hot Prompts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">热门提示词</h2>
            <Link href="/prompts" className="text-primary hover:underline">
              查看全部 →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotPrompts.map((prompt) => (
              <Link key={prompt.id} href={`/prompts/${prompt.id}`}>
                <Card className="card-hover h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{prompt.title}</CardTitle>
                      <Badge variant="secondary">{prompt.category}</Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {prompt.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex gap-2">
                        {prompt.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <span>❤️</span>
                        <span>{prompt.likes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Tutorials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">最新教程</h2>
            <Link href="/tutorials" className="text-primary hover:underline">
              查看全部 →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestTutorials.map((tutorial) => (
              <Link key={tutorial.id} href={`/tutorials/${tutorial.id}`}>
                <Card className="card-hover h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge>{tutorial.level}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {tutorial.readTime} 分钟阅读
                      </span>
                    </div>
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {tutorial.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{tutorial.author}</span>
                      <span>{tutorial.views} 次阅读</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            准备好提升你的AI技能了吗？
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            从今天开始学习提示词工程，让AI成为你最强大的助手
          </p>
          <Link href="/tutorials">
            <Button size="lg">
              免费开始学习
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎓</span>
                <span className="font-bold text-xl">studyai.ltd</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI提示词学习与实践平台，帮助你掌握 Prompt Engineering 技能
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">快速链接</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/prompts" className="hover:text-foreground">提示词库</Link></li>
                <li><Link href="/tutorials" className="hover:text-foreground">教程中心</Link></li>
                <li><Link href="/tools" className="hover:text-foreground">提示词工具</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">学习资源</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/tutorials?level=入门" className="hover:text-foreground">入门教程</Link></li>
                <li><Link href="/tutorials?level=进阶" className="hover:text-foreground">进阶教程</Link></li>
                <li><Link href="/tutorials?level=场景" className="hover:text-foreground">场景教程</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">关于我们</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">平台介绍</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">联系我们</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground">隐私政策</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 studyai.ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
