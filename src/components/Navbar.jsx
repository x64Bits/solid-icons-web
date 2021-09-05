import { Link } from "solid-app-router"
import { AiFillGithub } from "solid-icons/ai"
import { IoMoon } from "solid-icons/io"
import { BiSolidSun } from "solid-icons/bi"
import { Match, Switch, useContext } from "solid-js"

import { AppContext } from "../utils/AppContext"

export default function Navbar() {
  const [state, { onToggleDarkMode }] = useContext(AppContext)

  const handleDarkMode = () => {
    onToggleDarkMode()
  }

  return (
    <nav className="h-16 fixed w-full bg-white dark:bg-dark-bg z-10 grid grid-cols-6 border-b border-theme-border dark:border-dark-separators px-6">
      <div className="flex justify-start items-center col-span-1">
        <Link href="/">
          <h1 className="font-bold text-light-text-primary dark:text-dark-text-primary">
            solid-icons
          </h1>
        </Link>
      </div>
      <div className="col-span-5 flex justify-end items-center text-theme-main">
        <button
          className="flex flex-row items-center px-1 py-1 borde bg-gray-100 dark:bg-dark-card-bg rounded-full"
          onClick={handleDarkMode}
        >
          <Switch>
            <Match when={state.darkMode}>
              <BiSolidSun className="text-light-text-primary dark:text-dark-text-primary" />
            </Match>
            <Match when={!state.darkMode}>
              <IoMoon className="text-light-text-primary dark:text-dark-text-primary" />
            </Match>
          </Switch>
        </button>
        <a href="https://github.com/x64Bits/solid-icons" target="_blank">
          <button className="flex flex-row items-center px-2 py-1">
            <span className="text-light-text-secondary">Github</span>{" "}
            <AiFillGithub className="ml-1 text-light-text-primary dark:text-dark-text-primary" />
          </button>
        </a>
      </div>
    </nav>
  )
}
