import "@/app/globals.css"
import "@mantine/core/styles.css"

import { ColorSchemeScript, MantineProvider } from "@mantine/core"
import { Analytics } from "@vercel/analytics/react"

const siteName = "Links Share"
const description =
  "Links Shareは、X(Twitter)やMisskeyやMastodonなどに共有するためのサービスです。"
const siteUrl = "https://links-share.vercel.app"

export const metadata = {
  // ref: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: description,
  url: siteUrl,
  twitter: {
    card: "summary",
    title: siteName,
    description: description,
    images: ["/opengraph-image.png"],
  },
  openGraph: {
    title: siteName,
    description: description,
    url: siteUrl,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">
          {children}
          <Analytics />
        </MantineProvider>
      </body>
    </html>
  )
}
