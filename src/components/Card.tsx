"use client"
import { serviceAtom } from "@/global"
import { Autocomplete, Card, CloseButton, Select } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { useAtom } from "jotai"
import { useSearchParams } from "next/navigation"
import { memo, useState } from "react"
import { TextBox } from "./Form"

type Props = {
  misskey: string[]
  mastodon: string[]
}

const MemoTextBox = memo(TextBox)

export function ShareCard({ misskey, mastodon }: Props) {
  const [service, setService] = useAtom(serviceAtom)
  const searchParams = useSearchParams()
  const paramService = searchParams.get("service")
  const paramServer = searchParams.get("server")
  const [localMissikeyServer, setLocalMisskeyServer] = useLocalStorage({
    key: "misskey-server",
    defaultValue: "misskey.io",
  })

  const [localMastodonServer, setLocalMastodonServer] = useLocalStorage({
    key: "mastodon-server",
    defaultValue: "mastdn.jp",
  })

  useState(() => {
    if (paramService === "misskey" && paramServer) {
      setLocalMisskeyServer(paramServer)
    } else if (paramService === "mastodon" && paramServer) {
      setLocalMastodonServer(paramServer)
    }
  })

  useState(() => {
    if (paramService) {
      setService(paramService)
    }
  })

  return (
    <Card withBorder className="flex w-full max-w-3xl gap-8">
      <Select
        label="共有先"
        description="共有先のサービスを選択"
        searchValue={service}
        onSearchChange={setService}
        data={["X", "misskey", "mastodon"]}
      />
      {service.toLowerCase() === "misskey" ? (
        <Autocomplete
          label="サーバーを選択"
          description="共有先のサーバーを入力"
          placeholder="ex: misskey.io"
          data={misskey}
          value={localMissikeyServer}
          onChange={(event) => setLocalMisskeyServer(event)}
          required
          rightSection={
            <CloseButton
              onClick={() => setLocalMisskeyServer("")}
              style={{ display: localMissikeyServer ? undefined : "none" }}
            />
          }
        />
      ) : null}
      {service.toLowerCase() === "mastodon" ? (
        <Autocomplete
          label="サーバーを選択"
          description="共有先のサーバーを入力"
          placeholder="ex: mastdn.jp"
          data={mastodon}
          value={localMastodonServer}
          onChange={(event) => setLocalMastodonServer(event)}
          required
          rightSection={
            <CloseButton
              onClick={() => setLocalMastodonServer("")}
              style={{ display: localMastodonServer ? undefined : "none" }}
            />
          }
        />
      ) : null}
      <MemoTextBox />
    </Card>
  )
}
