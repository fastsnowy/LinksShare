import { Hono } from "hono"
import { handle } from "hono/vercel"

export const runtime = "edge"

const app = new Hono().basePath("/api")

const route = app
  .get("/server/misskey", async (c) => {
    const res = await fetch("https://instanceapp.misskey.page/instances.json", {
      next: { revalidate: 60 * 60 * 24 },
    })
    const data = (await res.json()) as { instancesInfos: { url: string }[] }
    const urls = data.instancesInfos.map((instance: { url: string }) => {
      return instance.url
    })
    return c.json(urls)
  })
  .get("/server/mastodon", async (c) => {
    const res = await fetch(
      "https://api.joinmastodon.org/servers?language=&category=&region=&ownership=&registrations=",
      { next: { revalidate: 60 * 60 * 24 } },
    )
    const data = (await res.json()) as { domain: string }[]
    const urls = data.map((instance: { domain: string }) => {
      return instance.domain
    })
    return c.json(urls)
  })

export const GET = handle(route)
export const POST = handle(route)

export type AppType = typeof route
