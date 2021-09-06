import { useLocation } from "solid-app-router"
import { lazy, Show } from "solid-js"
import { useContext } from "solid-js"
import { AiFillSetting } from "solid-icons/ai"

import IconsCount from "./IconsCount"
import { createEffect } from "solid-js"
import { SearchContext } from "./Search/Context"

const Search = lazy(() => import("./Search"))

const tollbarBaseStyles =
  "flex flex-row items-center toolbar text-light-text-secondary"

const compactView = `${tollbarBaseStyles} h-32 px-52 justify-center`

const fullView = `${tollbarBaseStyles} h-16 px-8 border-b border-theme-border dark:border-dark-separators w-full justify-between`

export default function Toolbar() {
  let containerRef
  const location = useLocation()
  const [state] = useContext(SearchContext)

  createEffect(() => {
    const isSearch = location.pathname.includes("/search")
    containerRef.className = isSearch ? fullView : compactView
  })

  return (
    <div ref={containerRef}>
      <Show when={location.pathname.includes("/search")}>
        <IconsCount count={state.resultCount} />
      </Show>
      <Search />
      <Show when={location.pathname.includes("/search")}>
        <div className="w-52 flex justify-end opacity-0 cursor-default">
          <button className="border cursor-default dark:border-dark-separators rounded-md flex flex-row items-center text-light-text-secondary dark:text-dark-secondary px-6 py-1 text-lg">
            <AiFillSetting className="mr-2" /> Settings
          </button>
        </div>
      </Show>
    </div>
  )
}
