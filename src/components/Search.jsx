import { createEffect, createSignal, Match, onMount, Switch } from "solid-js"
import { IoCloseCircle, IoSearch } from "solid-icons/io"
import { useLocation, useNavigate } from "solid-app-router"

import createDebounce from "../utils/createDebounce"
import { isShowToolbar } from "../utils/context-helpers"
import Spinner from "./Spinner"

export default function Search(props) {
  let searchRef
  const location = useLocation()
  const [searchTerm, setSearchTerm] = createSignal("")
  const [loading, setLoading] = createSignal(false)

  createEffect(() => {
    document.addEventListener("keyup", (event) => {
      const keyName = event.key
      if (keyName === "/" && searchRef) {
        searchRef.focus()
      }
    })
  })

  onMount(() => {
    if (isShowToolbar(location)) {
      const path = location.pathname
      const splitPath = path.split("/")
      const param = splitPath[splitPath.length - 1]

      searchRef.value = param

      searchTerm(() => param)
    }
  })

  const callme = () => {
    setLoading(false)
    handleNavigate(searchTerm())
  }

  const [trigger, clear] = createDebounce(callme, 750)

  const handleNavigate = (term) => {
    navigate(`/search/${term}`)
  }

  const navigate = useNavigate()

  async function onSearch(event) {
    const { value = "" } = event.target
    const cleanValue = value.replace(
      /[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g,
      ""
    )

    setSearchTerm(() => cleanValue)

    if (cleanValue.length >= 3) {
      setLoading(true)
      return trigger()
    }

    loading() && setLoading(false)

    navigate("/")
  }

  const onClearSearch = () => {
    setSearchTerm("")
    searchRef.value = ""
  }

  const inputBaseStyles = "flex justify-center items-center search-container"

  const smallStyles = `${inputBaseStyles} h-10 bg-input rounded-md px-8 bg-light-card-bg dark:bg-dark-card-bg`

  const bigStyles = `${inputBaseStyles} h-20 w-full bg-white dark:bg-dark-card-bg rounded-lg px-16 justify-center items-center shadow focus-within:border-light-card-border border border-transparent shadow-lg`

  return (
    <div className="flex justify-center items-center w-full">
      <div className={props.withToolbar ? smallStyles : bigStyles}>
        <Switch>
          <Match when={loading()}>
            <Spinner />
          </Match>
          <Match when={!loading()}>
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
          value={searchTerm()}
          ref={searchRef}
          autoFocus
          className="h-12 w-full text-lg bg-transparent overflow-x-hidden text-light-text-secondary dark:text-dark-text-secondary"
          placeholder="Search icons (press / to focus)"
        />
        <Show when={searchTerm() && !loading()}>
          <IoCloseCircle size="2em" onClick={onClearSearch} />
        </Show>
      </div>
    </div>
  )
}
