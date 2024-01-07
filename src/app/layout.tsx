import "@/app/globals.css"
import "@mantine/core/styles.css"

import { ColorSchemeScript, MantineProvider } from "@mantine/core"

export const metadata = {
  title: "Share Link",
  description: "I have followed setup instructions carefully",
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
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  )
}
