import { Link } from "solid-app-router"
import { useContext } from "solid-js"
import { SearchContext } from "./Search/Context"

export default function RecentlySearch(props) {
  const [searchState] = useContext(SearchContext)

  return (
    <Show when={props.show}>
      <div className="text-light-text-primary dark:text-dark-text-primary">
        <div className="flex flex-row items-center justify-start">
          <div className="mr-1">
            <small>Recently searched: </small>
          </div>
          <div className="flex flex-row-reverse">
            {searchState.recentlySearched.map((term, index) => (
              <small className="mr-1">
                <Link href={`/search/${term}`} className="underline">
                  <>{term}</>
                </Link>
                {index !== 0 && `, `}
              </small>
            ))}
          </div>
        </div>
      </div>
    </Show>
  )
}
