import "@/app/globals.css"
import "@mantine/core/styles.css"

import { ColorSchemeScript, MantineProvider } from "@mantine/core"

const siteName = "Links Share"
const description =
  "Links Shareは、X(Twitter)やMisskeyやMastodonなどに共有するためのサービスです。"
const siteUrl = "https://links-share.vercel.app/"

export const metadata = {
  title: siteName,
  description: description,
  url: siteUrl,
  twitter: {
    card: "summary",
    title: siteName,
    description: description,
  },
  openGraph: {
    title: siteName,
    description: description,
    siteUrl,
    siteName,
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
        <MantineProvider defaultColorScheme="auto">{children}</MantineProvider>
      </body>
    </html>
  )
}
