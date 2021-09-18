import { NavLink } from "solid-app-router"
import { createSignal, For, onMount } from "solid-js"

import ItemsSkeleton from "./ItemsSkeleton"

const env = import.meta.env
const METADATA_SRC = env.DEV ? "/public" : ""

function Items(props) {
  const [packs, setPacks] = createSignal([])
  onMount(async () => {
    const metadataPath = `${METADATA_SRC}/meta.js`
    await import(metadataPath).then((meta) => setPacks(() => meta.default))
  })

  return (
    <For each={packs()} fallback={<ItemsSkeleton />}>
      {(pack) => (
        <li className="flex">
          <NavLink
            className="px-3 py-2 mx-3 cursor-pointer rounded-md hover:bg-flat-card hover:border-theme-border"
            replace={true}
            href={`/search/pkg:${pack.path}`}
            onClick={props.onHide}
          >
            {" "}
            {pack.name}
          </NavLink>
        </li>
      )}
    </For>
  )
}

export default Items
