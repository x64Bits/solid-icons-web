import { useParams } from "solid-app-router"
import {
  createSignal,
  For,
  Match,
  Show,
  Suspense,
  Switch,
  useContext,
} from "solid-js"
import { onMount, onCleanup } from "solid-js"
import { createEffect } from "solid-js"
import { FiExternalLink } from "solid-icons/fi"
import { BiSearchAlt } from "solid-icons/bi"

import Icon from "../../components/Icon"
import IconPreview from "../../components/IconPreview"
import { AppContext } from "../../components/AppContext"
import { getPackageData, searchByTerm } from "./helpers"
import { SearchContext } from "../../components/Search/Context"
import IconSkeleton from "../../components/IconSkeleton"
import IconsSkeleton from "../../components/IconsSkeleton"
import Customizer from "../../components/Customizer"

const env = import.meta.env
const SEARCH_SRC = env.DEV ? "/public" : ""

export default function Icons() {
  const [searchResult, setSearchResult] = createSignal([])
  const [state] = useContext(AppContext)
  const [_, { onSetResultCount, onSaveSearch, onToggleCompact }] =
    useContext(SearchContext)

  const [searching, setSearching] = createSignal(true)
  const [pattern, setPattern] = createSignal("")
  const [pkg, setPkg] = createSignal()

  const params = useParams()

  const onFilterData = async (term) => {
    setSearching(true)
    const data = await import(`${SEARCH_SRC}/search.js`).then((i) => i.default)

    onSaveSearch(term)

    const { result, pkg } = await searchByTerm(data.icons, term)

    const hightlightPattern = new RegExp(`(${term})`, "i")
    setPattern(() => hightlightPattern)

    const pkgData = await getPackageData(pkg)

    setPkg(pkgData)

    onSetResultCount(result.length)

    setSearchResult(result)

    setSearching(false)
  }

  onMount(() => {
    onToggleCompact(true)
    onFilterData(params.term)
  })

  onCleanup(() => onToggleCompact(false))

  createEffect(() => onFilterData(params.term))

  return (
    <>
      <Show when={pkg()}>
        <div className="w-full flex flex-col items-start px-10 mt-4 mb-2 text-light-text-secondary dark:text-dark-text-secondary">
          <h2 className="text-3xl text-light-text-secondary dark:text-dark-text-secondary mb-1">
            {pkg().name}
          </h2>
          <p>
            License: <b>{pkg().license}</b>
          </p>
          <p className="flex flex-row text-blue-500">
            <a
              href={pkg().sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex flex-row items-center"
            >
              Repository
              <FiExternalLink className="ml-1" />
            </a>
          </p>
        </div>
      </Show>
      <div className="flex flex-row flex-wrap w-full max-w-full overflow-x-hidden pt-8 relative justify-center">
        <Switch>
          <Match when={searchResult().length}>
            <For each={searchResult()}>
              {(icon) => (
                <Suspense
                  fallback={
                    <IconSkeleton className="flex icon-container flex-col items-center justify-center h-32 w-36 mx-2 my-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card-bg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary" />
                  }
                >
                  <Icon
                    wrapperClass="flex icon-container flex-col items-center justify-center h-32 w-36 mx-2 my-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card-bg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary"
                    size="2.8rem"
                    className="icon-svg"
                    pattern={pattern()}
                    name={icon}
                  />
                </Suspense>
              )}
            </For>
          </Match>
          <Match when={!searchResult().length && !searching()}>
            <div className="w-full flex flex-col justify-center items-center text-light-text-secondary">
              <BiSearchAlt className="text-6xl" />
              <span className="text-2xl mt-3 text-center">
                No icons that match your search were found
              </span>
            </div>
          </Match>
        </Switch>
        <Show when={searching()}>
          <IconsSkeleton count={20} />
        </Show>
        <Show when={state.iconPreview}>
          <IconPreview />
        </Show>
      </div>
    </>
  )
}
