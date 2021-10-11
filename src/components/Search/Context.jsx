import { useNavigate } from "solid-app-router"
import { createContext, createEffect } from "solid-js"
import { createStore } from "solid-js/store"

import createDebounce from "../../utils/createDebounce"
import createLocalStorage from "../../utils/createLocalStorage"
import { saveLocalSearches } from "../../utils/save-searches"

export const SearchContext = createContext([
  {
    term: false,
    searching: false,
    result: [],
    resultCount: 0,
    compactView: false,
    recentlySearched: [],
  },
  {},
])

export default function SearchContextProvider(props) {
  const navigate = useNavigate()
  const [localSearches] = createLocalStorage("searches", [])
  const [state, setState] = createStore({
    term: null,
    searching: false,
    result: [],
    resultCount: 0,
    compactView: false,
    recentlySearched: [],
  })

  createEffect(() => setState("recentlySearched", localSearches))

  const handleNavigate = () => {
    setState("searching", false)
    navigate(`/search/${state.term}`)
  }

  const [trigger, clear] = createDebounce(handleNavigate, 750)

  const store = [
    state,
    {
      onSetTerm(newTerm) {
        setState("term", newTerm)

        if (newTerm.length >= 3) {
          setState("searching", true)
          return trigger()
        }

        clear()

        state.searching && setState("searching", false)

        navigate("/")
      },
      onSetResultCount(count) {
        setState("resultCount", count)
      },
      onToggleCompact(newValue) {
        setState("compactView", newValue)
      },
      onSaveSearch(term) {
        const newPayload = saveLocalSearches(term)
        setState("recentlySearched", newPayload)
      },
    },
  ]

  return (
    <SearchContext.Provider value={store}>
      {props.children}
    </SearchContext.Provider>
  )
}
