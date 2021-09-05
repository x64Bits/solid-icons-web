import { NavLink } from "solid-app-router"
import { createSignal, onMount } from "solid-js"

const env = import.meta.env
const METADATA_SRC = env.DEV ? "/public" : ""

export default function Sidepanel() {
  const [packs, setPacks] = createSignal([])

  onMount(async () => {
    const metadataPath = `${METADATA_SRC}/meta.js`
    const metadata = await import(metadataPath).then((i) => i.default)

    setPacks(metadata || [])
  })

  return (
    <>
      <aside className="col-span-1 pt-3 fixed side-panel overflow-y-auto border-r border-light-separators dark:border-dark-separators pb-3 text-light-text-secondary dark:text-dark-text-secondary">
        <ul className="pack-list">
          <li className="font-bold pl-5 pb-3">Collections</li>
          {packs().map((pack) => {
            return (
              <NavLink replace={true} href={`/search/pkg:${pack.path}`}>
                <li className="px-3 py-2 mx-3 cursor-pointer rounded-md hover:bg-flat-card hover:border-theme-border">
                  {" "}
                  {pack.name}
                </li>
              </NavLink>
            )
          })}
        </ul>
      </aside>
    </>
  )
}
