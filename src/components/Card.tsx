"use client"
import { serverAtom, serviceAtom } from "@/global"
import { Autocomplete, Card, CloseButton, Select } from "@mantine/core"
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
  const [server, setServer] = useAtom(serverAtom)
  const searchParams = useSearchParams()
  const paramService = searchParams.get("service")
  const paramServer = searchParams.get("server")

  useState(() => {
    if (paramService) {
      setService(paramService)
    }
  })

  useState(() => {
    if (paramServer) {
      setServer(paramServer)
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
          value={server}
          onChange={(event) => setServer(event)}
          required
          rightSection={
            <CloseButton
              onClick={() => setServer("")}
              style={{ display: server ? undefined : "none" }}
            />
          }
        />
      ) : null}
      {service.toLowerCase() === "mastodon" ? (
        <Autocomplete
          label="サーバーを選択"
          description="共有先のサーバーを入力"
          placeholder="ex: mastodon.social"
          data={mastodon}
          value={server}
          onChange={(event) => setServer(event)}
          required
          rightSection={
            <CloseButton
              onClick={() => setServer("")}
              style={{ display: server ? undefined : "none" }}
            />
          }
        />
      ) : null}
      <MemoTextBox />
    </Card>
  )
}
