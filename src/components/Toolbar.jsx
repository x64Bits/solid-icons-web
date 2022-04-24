import { lazy, Show } from "solid-js"
import { useContext } from "solid-js"
import { AiFillSetting } from "solid-icons/ai"

import IconsCount from "./IconsCount"
import { SearchContext } from "./Search/Context"
import RecentlySearch from "./RecentlySearch"
import { AppContext } from "../components/AppContext"

const Search = lazy(() => import("./Search"))

const tollbarBaseStyles =
  "flex md:flex-row items-center toolbar text-light-text-secondary"

const fullView = `${tollbarBaseStyles} lg:w-3/6 h-40 md:px-6 px-8 md:px-10 justify-center`

const compactView = `${tollbarBaseStyles} flex-col-reverse py-4 sm:pb-1 md:pb-4 h-auto md:h-16 px-8 border-b border-theme-border dark:border-dark-separators w-full justify-between`

export default function Toolbar() {
  const [state] = useContext(SearchContext)
  const [_, { onToggleCustomizer }] = useContext(AppContext)

  const handleToggleCustomizer = () => onToggleCustomizer()

  return (
    <div class={state.compactView ? compactView : fullView}>
      <Show when={state.compactView}>
        <IconsCount count={state.resultCount} />
      </Show>
      <div className="flex flex-col">
        <Search />
        <RecentlySearch show={!state.compactView} />
      </div>
      <Show when={state.compactView}>
        <div className="w-52 md:flex justify-end opacity-0">
          <button
            onClick={handleToggleCustomizer}
            type="button"
            className="border cursor-pointer dark:border-dark-card-border rounded-md flex flex-row items-center text-light-text-primary dark:text-dark-text-secondary px-6 py-1 text-lg"
          >
            <AiFillSetting className="mr-2" /> Settings
          </button>
        </div>
      </Show>
    </div>
  )
}
