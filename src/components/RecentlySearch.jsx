import { Link } from "solid-app-router"
import { createEffect, createSignal, useContext } from "solid-js"
import { SearchContext } from "./Search/Context"
import { getPackMetadata } from "./Sidepanel/contants"

const packReducer = (acc, current) =>
  Object.assign(acc, { [`pkg:${current.path}`]: current.name })

export default function RecentlySearch(props) {
  const [searchState] = useContext(SearchContext)
  const [packs, setPacks] = createSignal({})

  createEffect(async () => {
    if (searchState.recentlySearched.length) {
      const packMetadata = await getPackMetadata().then((result) =>
        result
          .map((pack) => ({ path: pack.path, name: pack.name }))
          .reduce(packReducer, {})
      )

      setPacks(packMetadata)
    }
  })

  const renderComma = (index, term) => {
    if (term.includes("pkg:")) {
      return packs()[term] && `, `
    }

    return index !== 0 && `, `
  }
  return (
    <Show when={props.show && searchState.recentlySearched.length}>
      <div className="text-light-text-primary dark:text-dark-text-primary pt-2">
        <div className="flex flex-row">
          <div className="flex mr-1">
            <small className="text-light-text-secondary whitespace-nowrap">
              Recently searched:{" "}
            </small>
          </div>
          <div className="flex flex-row flex-wrap">
            {searchState.recentlySearched.map((term, index) => (
              <small className="mr-1">
                <Link href={`/search/${term}`} className="underline">
                  <>{term.includes("pkg:") ? packs()[term] : term}</>
                </Link>
                {renderComma(index, term)}
              </small>
            ))}
          </div>
        </div>
      </div>
    </Show>
  )
}
