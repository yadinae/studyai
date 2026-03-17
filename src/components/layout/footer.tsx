import Link from "next/link";

const footerLinks = {
  product: [
    { label: "提示词库", href: "/prompts" },
    { label: "教程中心", href: "/tutorials" },
    { label: "社区", href: "#" },
    { label: "API", href: "#" },
  ],
  resources: [
    { label: "帮助中心", href: "#" },
    { label: "使用指南", href: "#" },
    { label: "常见问题", href: "#" },
    { label: "更新日志", href: "#" },
  ],
  legal: [
    { label: "隐私政策", href: "#" },
    { label: "服务条款", href: "#" },
    { label: "Cookie政策", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                AI
              </div>
              <span className="text-lg font-semibold">Prompt学习平台</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              从入门到精通，掌握 Prompt Engineering 技能，让AI成为你的得力助手。
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">产品</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">资源</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">法律</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 AI提示词学习平台. 保留所有权利.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:contact@example.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                contact@example.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
