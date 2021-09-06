import { createEffect, Match, onMount, Switch, useContext } from "solid-js"
import { IoCloseCircle, IoSearch } from "solid-icons/io"
import { useLocation } from "solid-app-router"

import { isCompact } from "../../utils/context-helpers"
import Spinner from "../Spinner"
import { SearchContext } from "./Context"

export const inputBaseStyles =
  "flex justify-center items-center search-container"

export const compactView = `${inputBaseStyles} h-10 bg-input rounded-md px-8 bg-light-card-bg dark:bg-dark-card-bg`

export const fullView = `${inputBaseStyles} h-20 w-full bg-white dark:bg-dark-card-bg rounded-lg px-16 justify-center items-center shadow focus-within:border-light-card-border border border-transparent shadow-lg`

export default function Search() {
  let searchRef
  let containerRef
  const [state, { onSetTerm }] = useContext(SearchContext)

  const location = useLocation()

  function toggleStyles(isSearch) {
    if (containerRef) {
      containerRef.className = !isSearch ? fullView : compactView
    }
  }

  onMount(() => {
    const isSearch = location.pathname.includes("/search")
    toggleStyles(isSearch)
  })

  createEffect(() => {
    const isSearch = location.pathname.includes("/search")
    toggleStyles(isSearch)
  })

  createEffect(() => {
    document.addEventListener("keyup", (event) => {
      const keyName = event.key
      if (keyName === "/" && searchRef) {
        searchRef.focus()
      }
    })
  })

  onMount(() => {
    if (isCompact(location)) {
      const path = location.pathname
      const splitPath = path.split("/")
      const param = splitPath[splitPath.length - 1]

      searchRef.value = param

      onSearch(param)
    }
  })

  async function onSearch(event = "") {
    const value = event?.target?.value || event
    const cleanValue = value.replace(
      /[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g,
      ""
    )

    onSetTerm(cleanValue)
  }

  const onClearSearch = () => {
    onSetTerm("")
    searchRef.value = ""
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div ref={containerRef}>
        <Switch>
          <Match when={state.searching}>
            <Spinner />
          </Match>
          <Match when={!state.searching}>
            <IoSearch
              size="1.3rem"
              className="text-light-text-primary dark:text-dark-text-primary mr-2 ml-1"
            />
          </Match>
        </Switch>
        <input
          type="text"
          id="search-input"
          onInput={onSearch}
          value={state.term}
          ref={searchRef}
          autoFocus
          className="h-12 w-full text-lg bg-transparent overflow-x-hidden text-light-text-secondary dark:text-dark-text-secondary"
          placeholder="Search icons (press / to focus)"
        />
        <Show when={state.term && !state.searching}>
          <IoCloseCircle size="2em" onClick={onClearSearch} />
        </Show>
      </div>
    </div>
  )
}
