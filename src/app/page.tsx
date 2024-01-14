import UI from "@/layouts"
import { getMastodonServerList, getMisskeyServerList } from "@/libs/services"

export default async function Home() {
  const misskeyData = await getMisskeyServerList()
  const mastodonData = await getMastodonServerList()
  const mastodonInstanceList = mastodonData.map((instance) => instance.domain)
  const misskeyInstanceList = misskeyData.data.map(
    (instance) => instance.instance,
  )

  return (
    <UI
      misskeyInstanceList={misskeyInstanceList}
      mastodonInstanceList={mastodonInstanceList}
    />
  )
}
