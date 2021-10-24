import { useLocation } from "solid-app-router"
import { lazy, Show } from "solid-js"
import { useContext } from "solid-js"
import { AiFillSetting } from "solid-icons/ai"
import { createEffect } from "solid-js"

import IconsCount from "./IconsCount"
import { SearchContext } from "./Search/Context"
import RecentlySearch from "./RecentlySearch"

const Search = lazy(() => import("./Search"))

const tollbarBaseStyles =
  "flex md:flex-row items-center toolbar text-light-text-secondary"

const compactView = `${tollbarBaseStyles} lg:w-3/6 h-40 md:px-6 px-8 md:px-10 justify-center`

const fullView = `${tollbarBaseStyles} flex-col-reverse py-4 sm:pb-1 md:pb-4 h-auto md:h-16 px-8 border-b border-theme-border dark:border-dark-separators w-full justify-between`

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
      <div className="flex flex-col">
        <Search />
        <RecentlySearch show={!location.pathname.includes("/search")} />
      </div>
      <Show when={location.pathname.includes("/search")}>
        <div className="w-52 hidden md:flex justify-end opacity-0 cursor-default">
          <button className="border cursor-default dark:border-dark-separators rounded-md flex flex-row items-center text-light-text-secondary dark:text-dark-secondary px-6 py-1 text-lg">
            <AiFillSetting className="mr-2" /> Settings
          </button>
        </div>
      </Show>
    </div>
  )
}
