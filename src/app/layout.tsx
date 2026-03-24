import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import { config } from "@/data/config";

import Script from "next/script";
import { Providers } from "@/components/providers";
import { ConditionalShell } from "@/components/conditional-shell";

export const metadata: Metadata = {
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    images: [
      {
        url: config.ogImg,
        width: 800,
        height: 600,
        alt: "Portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
    images: [config.ogImg],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// const archivoBlack = Archivo_Black({
//   subsets: ["latin"],
//   weight: "400",
//   variable: "--font-display",
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en" className={[inter.variable, archivoBlack.variable, "font-display"].join(" ")} suppressHydrationWarning>
    <html lang="en" className={["font-sans", "font-display"].join(" ")} suppressHydrationWarning>
      <head>
        <Script
          defer
          src={process.env.UMAMI_DOMAIN}
          data-website-id={process.env.UMAMI_SITE_ID}
        ></Script>
        {/* <Analytics /> */}
      </head>
      <body>
        <Providers>
          <ConditionalShell>
            {children}
          </ConditionalShell>
        </Providers>
      </body>
    </html>
  );
}
