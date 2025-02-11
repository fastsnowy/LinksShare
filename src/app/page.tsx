import { AboutThisSite } from "@/components/About"
import { ShareCard } from "@/components/Card"
import { ActionIcon } from "@mantine/core"
import { IconBrandGithub } from "@tabler/icons-react"
import { hc } from "hono/client"
import { Suspense } from "react"
import { AppType } from "./api/[[...route]]/route"

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!)

export default async function Home() {
  try {
    const res_mi = await client.api.server.misskey.$get()
    if (!res_mi.ok) {
      throw new Error(`Error fetching misskey instances: ${res_mi.statusText}`)
    }
    const res_mstdn = await client.api.server.mastodon.$get()
    if (!res_mstdn.ok) {
      throw new Error(
        `Error fetching mastodon instances: ${res_mstdn.statusText}`,
      )
    }

    const misskeyInstanceList = await res_mi.json()
    const mastodonInstanceList = await res_mstdn.json()

    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4 gap-8">
        <AboutThisSite />
        <Suspense>
          <ShareCard
            misskey={misskeyInstanceList}
            mastodon={mastodonInstanceList}
          />
        </Suspense>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="lg"
          component="a"
          target="_blank"
          href="https://github.com/fastsnowy/LinksShare"
        >
          <IconBrandGithub />
        </ActionIcon>
      </main>
    )
  } catch (error) {
    console.error(error)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4 gap-8">
        <AboutThisSite />
        <Suspense>
          <ShareCard misskey={["misskey.io"]} mastodon={["mstdn.jp"]} />
        </Suspense>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="lg"
          component="a"
          target="_blank"
          href="https://github.com/fastsnowy/LinksShare"
        >
          <IconBrandGithub />
        </ActionIcon>
      </main>
    )
  }
}
