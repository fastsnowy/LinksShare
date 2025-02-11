import { AboutThisSite } from "@/components/About"
import { ShareCard } from "@/components/Card"
import { ActionIcon } from "@mantine/core"
import { IconBrandGithub } from "@tabler/icons-react"
import { hc } from "hono/client"
import { Suspense } from "react"
import { AppType } from "./api/[[...route]]/route"

const hcHost =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : "https://links-share.vercel.app/"
console.log(hcHost)
const client = hc<AppType>(hcHost)

export default async function Home() {
  const res_mi = await client.api.server.misskey.$get()
  const res_mstdn = await client.api.server.mastodon.$get()
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
}
