import { createContext, createEffect } from "solid-js"
import { createStore } from "solid-js/store"

import createLocalStorage from "./createLocalStorage"
import { darkModeScrollbars } from "./context-helpers"

export const AppContext = createContext([
  { withToolbar: false, iconsCount: 0, iconPreview: null, darkMode: false },
  {}
])

export default function AppContextProvider(props) {
  const [storedDarkMode, setDarkMode] = createLocalStorage("darkMode", false)
  const [state, setState] = createStore({
    withToolbar: false,
    iconsCount: 0,
    iconPreview: null,
    darkMode: storedDarkMode
  })

  createEffect(() => {
    darkModeScrollbars(!state.darkMode)
  })

  const store = [
    state,
    {
      handleToggleToolbar(newValue) {
        setState("withToolbar", newValue)
      },
      setIconsCount(quantity) {
        setState("iconsCount", quantity)
      },
      onSetIconPreview(iconName) {
        setState("iconPreview", iconName)
      },
      onToggleDarkMode() {
        setState("darkMode", !state.darkMode)
        setDarkMode(!storedDarkMode)
      }
    }
  ]

  return (
    <AppContext.Provider value={store}>{props.children}</AppContext.Provider>
  )
}
