import { ComponentProps, forwardRef } from "react"

type IntentProps = {
  instance: string
  title?: string
  text?: string
  url?: string
} & Omit<ComponentProps<"a">, "href" | "target" | "rel">

export const IntentNote = forwardRef<
  HTMLAnchorElement,
  IntentProps
>(
  (
    { instance, title, text, url, ...intrinsicProps },
    forwardedRef,
  ) => {
    const _url = new URL(`https://${instance}/share`)

    if (title !== undefined) _url.searchParams.set("title", title)
    if (text !== undefined) _url.searchParams.set("text", text)
    if (url !== undefined) _url.searchParams.set("url", url)


    return (
      <a
        ref={forwardedRef}
        href={_url.toString()}
        target="_blank"
        rel="noopener noreferrer"
        {...intrinsicProps}
      />
    )
  },
)

if (process.env.NODE_ENV === "development") {
  IntentNote.displayName = "MisskeyShareLink"
}
