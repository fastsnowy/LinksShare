"use client"
import { serviceAtom } from "@/global"
import { Button, Textarea } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { useAtom } from "jotai"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { IntentNote } from "./IntentShare"
import { TwitterIntentTweet } from "./XShare"

export const TextBox = () => {
  const [shareText, setShareText] = useState("")
  const [service] = useAtom(serviceAtom)
  const searchParams = useSearchParams()

  const paramText = searchParams.get("text")
  const paramUrl = searchParams.get("url")
  const paramVia = searchParams.get("via")
  const [localMissikeyServer] = useLocalStorage({
    key: "misskey-server",
    defaultValue: "",
  })
  const [localMastodonServer] = useLocalStorage({
    key: "mastodon-server",
    defaultValue: "",
  })

  useState(() => {
    if (paramText !== null) {
      setShareText(paramText)
    }
    if (paramUrl !== null) {
      setShareText((prev) => `${prev}\n${paramUrl}`)
    }
    if (paramVia !== null) {
      setShareText((prev) => `${prev} @${paramVia}より`)
    }
  })
  return (
    <div className="flex flex-col gap-8">
      <Textarea
        label="テキスト"
        value={shareText}
        onChange={(event) => setShareText(event.currentTarget.value)}
        autosize
        minRows={4}
      />
      <Button
        variant="light"
        instance={
          service === "misskey" ? localMissikeyServer : localMastodonServer
        }
        component={
          service === "misskey" || service === "mastodon"
            ? IntentNote
            : TwitterIntentTweet
        }
        text={shareText}
        disabled={
          (localMissikeyServer === "" && service === "misskey") ||
          (localMastodonServer === "" && service === "mastodon")
        }
        onClick={(event) => {
          if (
            (localMissikeyServer === "" && service === "misskey") ||
            (localMastodonServer === "" && service === "mastodon")
          ) {
            event.preventDefault()
          }
        }}
      >
        シェア
      </Button>
    </div>
  )
}
