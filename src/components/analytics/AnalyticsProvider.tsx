"use client";

import { GoogleAnalytics } from "./GoogleAnalytics";
import { BaiduAnalytics, BaiduPageTracker } from "./BaiduAnalytics";

export function AnalyticsProvider() {
  return (
    <>
      <GoogleAnalytics />
      <BaiduAnalytics />
      <BaiduPageTracker />
    </>
  );
}
