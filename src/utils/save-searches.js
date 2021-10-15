import createLocalStorage from "./createLocalStorage"

export function saveLocalSearches(term) {
  const [currentSearches, setCurrentSearches] = createLocalStorage(
    "searches",
    []
  )

  currentSearches.length >= 5 && currentSearches.pop()

  currentSearches.unshift(term)

  const newSearches = [...new Set(currentSearches)]

  setCurrentSearches(newSearches)

  return newSearches
}
