import { useLocation } from "solid-app-router"
import { lazy, onMount, Show } from "solid-js"
import { useContext } from "solid-js"
import { AppContext } from "../utils/AppContext"
import { AiFillSetting } from "solid-icons/ai"

import { isShowToolbar } from "../utils/context-helpers"
import IconsCount from "./IconsCount"
import { createEffect } from "solid-js"

const Search = lazy(() => import("./Search"))

export default function Toolbar() {
  const location = useLocation()
  const [state, { handleToggleToolbar }] = useContext(AppContext)

  onMount(() => handleToggleToolbar(isShowToolbar(location)))

  createEffect(() => handleToggleToolbar(isShowToolbar(location)))

  const tollbarBaseStyles =
    "flex flex-row items-center toolbar text-light-text-secondary"

  const fixedStyles = `${tollbarBaseStyles} h-32 px-52 justify-center`

  const fullStyles = `${tollbarBaseStyles} h-16 px-8 border-b border-theme-border dark:border-dark-separators w-full justify-between`

  return (
    <div className={state.withToolbar ? fullStyles : fixedStyles}>
      <Show when={state.withToolbar}>
        <IconsCount count={state.iconsCount} />
      </Show>
      <Search withToolbar={state.withToolbar} />
      <Show when={state.withToolbar}>
        <div className="w-52 flex justify-end opacity-0 cursor-default">
          <button className="border cursor-default dark:border-dark-separators rounded-md flex flex-row items-center text-light-text-secondary dark:text-dark-secondary px-6 py-1 text-lg">
            <AiFillSetting className="mr-2" /> Settings
          </button>
        </div>
      </Show>
    </div>
  )
}
