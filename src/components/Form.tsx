"use client"
import { serverAtom, serviceAtom } from "@/global"
import { Button, Textarea } from "@mantine/core"
import { useAtom } from "jotai"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { IntentNote } from "./IntentShare"
import { TwitterIntentTweet } from "./XShare"

export const TextBox = () => {
  const [shareText, setShareText] = useState("")
  const [instance] = useAtom(serverAtom)
  const [service] = useAtom(serviceAtom)
  const searchParams = useSearchParams()

  const paramText = searchParams.get("text")
  const paramUrl = searchParams.get("url")
  useState(() => {
    if (paramText) {
      if (paramUrl) {
        setShareText(`${paramText}\n${paramUrl}`)
      } else {
        setShareText(paramText)
      }
    }
  })
  return (
    <div className="flex flex-col gap-8">
      <Textarea
        label="Share text"
        value={shareText}
        onChange={(event) => setShareText(event.currentTarget.value)}
        autosize
        minRows={4}
      />

      <Button
        variant="light"
        instance={instance}
        component={
          service === "misskey" || service === "mastodon"
            ? IntentNote
            : TwitterIntentTweet
        }
        text={shareText}
      >
        Share
      </Button>
    </div>
  )
}
