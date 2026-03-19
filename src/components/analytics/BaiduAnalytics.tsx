"use client";

import Script from "next/script";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const BAIDU_TRACKING_ID = process.env.NEXT_PUBLIC_BAIDU_ID;

export function BaiduAnalytics() {
  // 只在生产环境且配置了百度统计 ID 时加载
  if (process.env.NODE_ENV !== "production" || !BAIDU_TRACKING_ID) {
    return null;
  }

  return (
    <Script
      id="baidu-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?${BAIDU_TRACKING_ID}";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
          })();
        `,
      }}
    />
  );
}

// 内部追踪组件（使用 useSearchParams）
function BaiduPageTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 只在生产环境追踪
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    // 百度统计 SPA 页面追踪
    if (typeof window !== "undefined" && (window as any)._hmt) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      (window as any)._hmt.push(["_trackPageview", url]);
    }
  }, [pathname, searchParams]);

  return null;
}

// SPA 路由切换追踪组件（带 Suspense 边界）
export function BaiduPageTracker() {
  return (
    <Suspense fallback={null}>
      <BaiduPageTrackerInner />
    </Suspense>
  );
}

// 手动追踪事件的辅助函数
export function trackBaiduEvent(
  category: string,
  action: string,
  opt_label?: string,
  opt_value?: number
) {
  if (typeof window !== "undefined" && (window as any)._hmt) {
    const eventData: any[] = ["_trackEvent", category, action];
    if (opt_label) eventData.push(opt_label);
    if (opt_value !== undefined) eventData.push(opt_value);
    (window as any)._hmt.push(eventData);
  }
}

// 预定义的事件分类
export const BAIDU_CATEGORIES = {
  PROMPT: "提示词",
  TUTORIAL: "教程",
  TOOL: "工具",
  SEARCH: "搜索",
  USER: "用户行为",
  NAVIGATION: "导航",
} as const;
