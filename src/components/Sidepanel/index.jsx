import { createSignal, For, onMount, useContext } from "solid-js"

import { AppContext } from "../AppContext"
import { createClickOutside } from "../../utils/createClickOutside"
import Item from "./Item"
import ItemsSkeleton from "./ItemsSkeleton"
import { getPackMetadata } from "./contants"

export default function Sidepanel() {
  let panelRef
  const [state, { onToggleSidepanel }] = useContext(AppContext)
  const [packs, setPacks] = createSignal([])

  function onHide() {
    state.openSidepanel && onToggleSidepanel(false)
  }

  onMount(async () => {
    createClickOutside(panelRef, () => onHide())

    const packMetadata = (await getPackMetadata()) || []

    setPacks(packMetadata)
  })

  return (
    <div
      className={`fixed z-40 inset-0 flex-none h-full bg-opacity-25 w-full lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 lg:block sm:hidden ${
        state.openSidepanel ? "block" : "hidden"
      }`}
    >
      <div
        ref={panelRef}
        className={` ${
          state.openSidepanel ? "mt-16" : ""
        } h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:fixed lg:bg-transparent overflow-hidden lg:top-18 mr-24 lg:mr-0`}
      >
        <aside
          className={`px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-md pb-10 lg:pt-10 lg:pb-14 side-panel bg-white dark:bg-dark-bg border-r border-light-separators dark:border-dark-separators text-light-text-secondary dark:text-dark-text-secondary`}
        >
          <ul className="pack-list">
            <li className="font-bold pl-5 pb-3">Collections</li>
            <For each={packs()} fallback={<ItemsSkeleton />}>
              {(item) => (
                <Item onHide={onHide} name={item.name} path={item.path} />
              )}
            </For>
          </ul>
        </aside>
      </div>
    </div>
  )
}
