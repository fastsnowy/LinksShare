import { MastodonServer, MisskeyServer } from "@/types"

export async function getMisskeyServerList() {
  const res = await fetch(
    "https://misskeydomains-1-n3118453.deta.app/misskey",
    { next: { revalidate: 60 * 60 * 24 } },
  )
  const data = (await res.json()) as MisskeyServer
  return data
}

export async function getMastodonServerList() {
  const res = await fetch(
    "https://api.joinmastodon.org/servers?language=&category=&region=&ownership=&registrations=",
    {
      next: { revalidate: 60 * 60 * 24 },
    },
  )
  const data = (await res.json()) as MastodonServer
  return data
}
