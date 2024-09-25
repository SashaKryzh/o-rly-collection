import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "~/components/meta/GoogleAnalytics";
import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/lib/utils";
import PostHogAnalyticsProvider from "~/components/meta/PostHogAnalytics";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={cn(GeistSans.variable, GeistMono.variable, "font-sans")}>
      <PostHogAnalyticsProvider>
        <Component {...pageProps} />
      </PostHogAnalyticsProvider>
      <SpeedInsights />
      <GoogleAnalytics gaId="G-VB63CNRL7H" />
      <Toaster richColors closeButton theme="light" />
    </div>
  );
};

export default api.withTRPC(MyApp);
