import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们 - AI 提示词学习与实践平台",
  description: "了解 studyai.ltd 平台的使命、愿景和团队。我们致力于帮助用户掌握 Prompt Engineering 技能，从入门到精通。",
  openGraph: {
    title: "关于我们 - AI 提示词学习与实践平台 | studyai.ltd",
    description: "了解 studyai.ltd 平台的使命、愿景和团队。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "关于我们 - AI 提示词学习与实践平台 | studyai.ltd",
    description: "了解 studyai.ltd 平台的使命、愿景和团队。",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-primary">🎓studyai.ltd</a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/prompts" className="text-sm font-medium text-muted-foreground hover:text-foreground">提示词库</a>
            <a href="/tutorials" className="text-sm font-medium text-muted-foreground hover:text-foreground">教程中心</a>
            <a href="/tools" className="text-sm font-medium text-muted-foreground hover:text-foreground">提示词工具</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">关于我们</h1>

        <section className="prose prose-lg max-w-none">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">🎯 我们的使命</h2>
            <p className="text-lg text-muted-foreground">
              在 AI 时代，掌握提示词工程（Prompt Engineering）技能已成为每个人的必备能力。
              studyai.ltd 致力于让每个人都能轻松学习并掌握这项技能，从入门到精通，让 AI 成为你最强大的助手。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border">
              <h3 className="text-xl font-semibold mb-3">📚 500+ 精选提示词</h3>
              <p className="text-muted-foreground">
                覆盖 AI 工具使用、图像生成、写作创作、编程开发、办公效率、学习教育、设计创意、生活助手等 8 大分类
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border">
              <h3 className="text-xl font-semibold mb-3">🎓 系统化教程</h3>
              <p className="text-muted-foreground">
                从入门到进阶，从理论到实践，循序渐进的学习路径帮助你快速掌握提示词工程核心技能
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border">
              <h3 className="text-xl font-semibold mb-3">💡 实战案例</h3>
              <p className="text-muted-foreground">
                每个提示词都配有完整的输入输出示例，让你一看就懂，一学就会，直接应用到实际工作中
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border">
              <h3 className="text-xl font-semibold mb-3">🆓 完全免费</h3>
              <p className="text-muted-foreground">
                所有学习资源完全免费开放，无需注册，无需付费，随时随地开始学习
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">🚀 我们的愿景</h2>
          <p className="mb-6">
            成为中文世界最专业、最实用的 AI 提示词学习平台，帮助 100 万 + 用户掌握 Prompt Engineering 技能，
            在 AI 时代保持竞争力。
          </p>

          <h2 className="text-2xl font-bold mb-4">👨‍💻 关于我们</h2>
          <p className="mb-6">
            studyai.ltd 由一群热爱 AI 技术的开发者创建。我们深度使用 ChatGPT、Claude、Gemini 等主流 AI 工具，
            在实战中积累了丰富的提示词工程经验。我们希望将这些经验系统化、结构化，让更多人受益。
          </p>

          <div className="bg-muted rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-3">📬 联系我们</h3>
            <p className="mb-2">
              如果你有任何问题、建议或合作意向，欢迎通过以下方式联系我们：
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>📧 Email: contact@studyai.ltd</li>
              <li>💬 飞书：yadinae</li>
              <li>🐦 Twitter: @yadinae</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-3">🌟 开始学习</h3>
            <p className="mb-4">
              准备好提升你的 AI 技能了吗？从今天开始学习提示词工程，让 AI 成为你最强大的助手！
            </p>
            <div className="flex gap-4">
              <a href="/tutorials" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                开始学习 →
              </a>
              <a href="/prompts" className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent">
                浏览提示词库
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3">🎓studyai.ltd</h4>
              <p className="text-sm text-muted-foreground">
                AI 提示词学习与实践平台，帮助你掌握 Prompt Engineering 技能
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">快速链接</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/prompts" className="hover:text-foreground">提示词库</a></li>
                <li><a href="/tutorials" className="hover:text-foreground">教程中心</a></li>
                <li><a href="/tools" className="hover:text-foreground">提示词工具</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">学习资源</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/tutorials?level=入门" className="hover:text-foreground">入门教程</a></li>
                <li><a href="/tutorials?level=进阶" className="hover:text-foreground">进阶教程</a></li>
                <li><a href="/tutorials?level=场景" className="hover:text-foreground">场景教程</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2026 studyai.ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
