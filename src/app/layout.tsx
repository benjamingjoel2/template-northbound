import config from "@config";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/Providers";
import { brandCssVariables, googleFontsHref } from "@/lib/fonts";
import "./globals.css";

const title = `${config.brand.name} — ${config.seo.title}`;
const shareImage = config.seo.shareImage.src;

export const metadata: Metadata = {
  metadataBase: new URL(config.brand.url),
  title,
  description: config.seo.description,
  applicationName: config.brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: config.brand.name,
    title,
    description: config.seo.description,
    url: "/",
    locale: config.seo.locale,
    images: [{ url: shareImage, alt: config.seo.shareImage.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: config.seo.description,
    images: [shareImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: config.colors.night,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={config.seo.locale}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: brandCssVariables() }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href={googleFontsHref()} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
