import { AboutThisSite } from "@/components/About"
import { ShareCard } from "@/components/Card"
import { ActionIcon } from "@mantine/core"
import { IconBrandGithub } from "@tabler/icons-react"

type Props = {
  misskeyInstanceList: string[]
  mastodonInstanceList: string[]
}

export default function UI({
  misskeyInstanceList,
  mastodonInstanceList,
}: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 gap-8">
      <AboutThisSite />
      <ShareCard
        misskey={misskeyInstanceList}
        mastodon={mastodonInstanceList}
      />
      <ActionIcon
        variant="light"
        color="gray"
        size="lg"
        component="a"
        target="_blank"
        href=""
      >
        <IconBrandGithub />
      </ActionIcon>
    </main>
  )
}
