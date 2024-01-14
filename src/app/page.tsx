import { AboutThisSite } from "@/components/About"
import { ShareCard } from "@/components/Card"
import { getMastodonServerList, getMisskeyServerList } from "@/libs/services"
import { ActionIcon } from "@mantine/core"
import { IconBrandGithub } from "@tabler/icons-react"

export default async function Home() {
  const misskeyData = await getMisskeyServerList()
  const mastodonData = await getMastodonServerList()
  const mastodonInstanceList = mastodonData.map((instance) => instance.domain)
  const misskeyInstanceList = misskeyData.data.map(
    (instance) => instance.instance,
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 gap-8">
      <AboutThisSite />
      <ShareCard
        misskey={misskeyInstanceList}
        mastodon={mastodonInstanceList}
      />
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
