"use client"
import { serverAtom, serviceAtom } from "@/global"
import {
  Autocomplete,
  Button,
  Card,
  CloseButton,
  Input,
  NativeSelect,
  TextInput,
  Textarea,
} from "@mantine/core"
import { atom, useAtom } from "jotai"
import { useSearchParams } from "next/navigation"
import { memo, useState } from "react"
import { TextBox } from "./Form"

type Props = {
  misskey: string[]
  mastodon: string[]
}

const MemoTextBox = memo(TextBox)

export function MyCard({ misskey, mastodon }: Props) {
  const [service, setService] = useAtom(serviceAtom)
  const [server, setServer] = useAtom(serverAtom)
  const searchParams = useSearchParams()
  const paramService = searchParams.get("service")
  const paramServer = searchParams.get("server")

  // serviceがあればそれを初期値とする
  useState(() => {
    if (paramService) {
      setService(paramService)
    }
  })
  // instanceがあればそれを初期値とする
  useState(() => {
    if (paramServer) {
      setServer(paramServer)
    }
  })
  console.log(service)
  // serviceの1文字目を大文字にする
  return (
    <Card withBorder className="flex w-full max-w-3xl gap-8">
      <NativeSelect
        label="Share to"
        description="Select service"
        value={service}
        onChange={(event) => setService(event.currentTarget.value)}
        data={["X", "misskey", "mastodon"]}
      />
      {service.toLowerCase() === "misskey" ? (
        <Autocomplete
          label="Select server"
          description="Input your server"
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
          label="Select server"
          description="Input your server"
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
