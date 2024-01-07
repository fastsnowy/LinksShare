"use client"
import {
  Autocomplete,
  Button,
  Card,
  NativeSelect,
  Textarea,
} from "@mantine/core"
import { useSearchParams } from "next/navigation"
import { memo, useState } from "react"
import { TwitterIntentTweet } from "./XShare"

type Props = {
  misskey: string[]
  mastodon: string[]
}

const TextBox = () => {
  const [shareText, setShareText] = useState("")
  return (
    <div className="flex flex-col gap-8">
      <Textarea
        label="Share text"
        value={shareText}
        onChange={(event) => setShareText(event.currentTarget.value)}
        autosize
        minRows={4}
      />
      <Button variant="light" component={TwitterIntentTweet} text={shareText}>
        Share
      </Button>
    </div>
  )
}

const MemoTextBox = memo(TextBox)

export function MyCard({ misskey, mastodon }: Props) {
  const [service, setService] = useState("")
  const searchParams = useSearchParams()
  const text = searchParams.get("text")
  const via = searchParams.get("service")
  console.log(text, via)
  return (
    <Card withBorder className="flex w-full max-w-3xl gap-8">
      <NativeSelect
        label="Share to"
        description="Select service"
        value={service}
        onChange={(event) => setService(event.currentTarget.value)}
        data={["X (Twitter)", "Misskey", "Mastodon"]}
      />
      {service === "Misskey" ? (
        <Autocomplete
          label="Select instance"
          description="Input your instance"
          placeholder="ex: misskey.io"
          data={misskey}
          required
        />
      ) : null}
      {service === "Mastodon" ? (
        <Autocomplete
          label="Select instance"
          description="Input your instance"
          placeholder="ex: mastodon.social"
          data={mastodon}
          required
        />
      ) : null}
      <MemoTextBox />
    </Card>
  )
}
