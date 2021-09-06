import { useNavigate } from "solid-app-router"
import { createContext } from "solid-js"
import { createStore } from "solid-js/store"

import createDebounce from "../../utils/createDebounce"

export const SearchContext = createContext([
  {
    term: false,
    searching: false,
    result: [],
    resultCount: 0,
    compactView: false,
  },
  {},
])

export default function SearchContextProvider(props) {
  const navigate = useNavigate()
  const [state, setState] = createStore({
    term: null,
    searching: false,
    result: [],
    resultCount: 0,
    compactView: false,
  })

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
    },
  ]

  return (
    <SearchContext.Provider value={store}>
      {props.children}
    </SearchContext.Provider>
  )
}
