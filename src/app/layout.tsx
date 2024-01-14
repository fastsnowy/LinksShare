import "@/app/globals.css"
import "@mantine/core/styles.css"

import { ColorSchemeScript, MantineProvider } from "@mantine/core"

export const metadata = {
  title: "Links Share",
  description:
    "Links Shareは、X(Twitter)やMisskeyやMastodonなどに共有するためのサービスです。",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">{children}</MantineProvider>
      </body>
    </html>
  )
}
