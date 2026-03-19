"use client";

import Script from "next/script";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  // 只在生产环境且配置了 GA ID 时加载
  if (process.env.NODE_ENV !== "production" || !GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      {/* GA4 基础脚本 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure',
              cookie_expires: 63072000, // 2 years
              cookie_update: true,
              allow_google_signals: true,
              allow_ad_personalization_signals: true,
              transport_type: 'beacon'
            });
          `,
        }}
      />
    </>
  );
}

// 手动追踪事件的辅助函数
export function trackGAEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventParams);
  }
}

// 预定义的关键事件
export const GA_EVENTS = {
  // 搜索相关
  SEARCH: "search",
  SEARCH_RESULT_CLICK: "search_result_click",

  // 提示词相关
  PROMPT_COPY: "prompt_copy",
  PROMPT_VIEW: "prompt_view",
  PROMPT_USE: "prompt_use",

  // 教程相关
  TUTORIAL_VIEW: "tutorial_view",
  TUTORIAL_COMPLETE: "tutorial_complete",

  // 工具相关
  TOOL_USE: "tool_use",
  TOOL_GENERATE: "tool_generate",

  // 用户互动
  SHARE: "share",
  FEEDBACK: "feedback",
  CONTACT: "contact",
} as const;
