import { createContext, createEffect, JSX, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";
import createLocalStorage from "~/hooks/create-local-storage";
import { darkModeScrollbars } from "~/utils/scrollbar-theme";

interface IAppContextProviderProps {
  children: JSX.Element;
}

export type IAppContextState = {
  readonly visibleNavbar: boolean;
  readonly activeIcon: null | string;
  readonly darkMode: boolean;
  readonly visibleNavSearch: boolean;
};

export type IAppContextValue = [
  state: IAppContextState,
  actions: {
    setVisibleNavbar: (newValue: boolean) => void;
    setActiveIcon: (title: string) => void;
    toggleDarkMode: (newValue: boolean) => void;
    setVisibleNavSearch: (newValue: boolean) => void;
  }
];

const initialState = {
  visibleNavbar: false,
  activeIcon: null,
  darkMode: false,
  visibleNavSearch: false,
};

export const AppContext = createContext<IAppContextValue>([
  initialState,
  {
    setVisibleNavbar: () => undefined,
    setActiveIcon: () => undefined,
    toggleDarkMode: () => undefined,
    setVisibleNavSearch: () => undefined,
  },
]);

export default function AppContextProvider(props: IAppContextProviderProps) {
  const [storedDarkMode, setDarkMode] = createLocalStorage("darkMode", false);
  const [state, setState] = createStore({
    visibleNavbar: false,
    activeIcon: null,
    darkMode: storedDarkMode,
    visibleNavSearch: false,
  });

  createEffect(() => {
    darkModeScrollbars(state.darkMode);
  });

  function setVisibleNavbar(newValue: boolean) {
    setState("visibleNavbar", newValue);
  }
  function setActiveIcon(iconName: string) {
    setState("activeIcon", iconName);
  }
  function toggleDarkMode(newValue: boolean) {
    setState("darkMode", newValue);
    setDarkMode(newValue);
  }
  function setVisibleNavSearch(newValue: boolean) {
    setState("visibleNavSearch", newValue);
  }

  return (
    <AppContext.Provider
      value={[
        state,
        {
          setVisibleNavbar,
          setActiveIcon,
          toggleDarkMode,
          setVisibleNavSearch,
        },
      ]}
    >
      {props.children}
    </AppContext.Provider>
  );
}