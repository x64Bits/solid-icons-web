import { NavLink } from "solid-app-router"
import { createEffect, createSignal, For, onMount, useContext } from "solid-js"
import { AppContext } from "../components/AppContext"
import { createClickOutside } from "../utils/createClickOutside"

const env = import.meta.env
const METADATA_SRC = env.DEV ? "/public" : ""

export default function Sidepanel() {
  let panelRef
  const [packs, setPacks] = createSignal([])
  const [state, { onToggleSidepanel }] = useContext(AppContext)

  function onHide() {
    state.openSidepanel && onToggleSidepanel(false)
  }

  onMount(() => createClickOutside(panelRef, () => onHide()))

  onMount(async () => {
    const metadataPath = `${METADATA_SRC}/meta.js`
    const metadata = await import(metadataPath).then((i) => i.default)

    setPacks(metadata || [])
  })

  function handleToggleSidepanel() {
    onToggleSidepanel(!state.openSidepanel)
  }

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
            <For each={packs()}>
              {(pack) => (
                <li className="flex">
                  <NavLink
                    className="px-3 py-2 mx-3 cursor-pointer rounded-md hover:bg-flat-card hover:border-theme-border"
                    replace={true}
                    href={`/search/pkg:${pack.path}`}
                    onClick={onHide}
                  >
                    {" "}
                    {pack.name}
                  </NavLink>
                </li>
              )}
            </For>
          </ul>
        </aside>
      </div>
    </div>
  )
}
