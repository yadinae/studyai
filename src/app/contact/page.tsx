import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "联系我们 - AI 提示词学习与实践平台",
  description: "有任何问题、建议或合作意向？欢迎联系 studyai.ltd 团队。我们期待你的反馈！",
  openGraph: {
    title: "联系我们 - AI 提示词学习与实践平台 | studyai.ltd",
    description: "有任何问题、建议或合作意向？欢迎联系 studyai.ltd 团队。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "联系我们 - AI 提示词学习与实践平台 | studyai.ltd",
    description: "有任何问题、建议或合作意向？欢迎联系 studyai.ltd 团队。",
  },
};

export default function ContactPage() {
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
        <h1 className="text-4xl font-bold mb-8">联系我们</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">📬 联系方式</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">contact@studyai.ltd</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <h3 className="font-semibold">飞书</h3>
                  <p className="text-muted-foreground">yadinae</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🐦</span>
                <div>
                  <h3 className="font-semibold">Twitter</h3>
                  <p className="text-muted-foreground">@yadinae</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💼</span>
                <div>
                  <h3 className="font-semibold">GitHub</h3>
                  <p className="text-muted-foreground">github.com/yadinae</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">💬 在线留言</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="你的姓名"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  邮箱
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  主题
                </label>
                <select
                  id="subject"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">请选择主题</option>
                  <option value="feedback">使用反馈</option>
                  <option value="suggestion">功能建议</option>
                  <option value="bug">问题报告</option>
                  <option value="cooperation">商务合作</option>
                  <option value="other">其他</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  留言内容
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="请详细描述你的问题或建议..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                发送留言
              </button>
            </form>
          </div>
        </div>

        <div className="bg-muted rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">❓ 常见问题</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">💡 平台是完全免费的吗？</h3>
              <p className="text-muted-foreground">
                是的！studyai.ltd 所有学习资源完全免费开放，无需注册，无需付费。我们相信知识应该自由传播。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">💡 提示词可以用于哪些 AI 工具？</h3>
              <p className="text-muted-foreground">
                我们的提示词适用于主流 AI 大模型，包括 ChatGPT、Claude、Gemini、文心一言、通义千问等。
                不同模型的响应可能略有差异，但核心思路是相通的。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">💡 如何提交新的提示词？</h3>
              <p className="text-muted-foreground">
                欢迎通过上方的联系方式向我们提交你的原创提示词！我们会审核后收录到平台中，
                并注明作者信息。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">💡 可以商用吗？</h3>
              <p className="text-muted-foreground">
                平台内容采用 CC BY-NC-SA 4.0 协议，允许非商业使用，需注明出处。
                商业用途请联系我们获取授权。
              </p>
            </div>
          </div>
        </div>
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
