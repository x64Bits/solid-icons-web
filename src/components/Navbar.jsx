import { Link } from "solid-app-router"
import { FiMenu } from "solid-icons/fi"
import { AiFillGithub } from "solid-icons/ai"
import { IoMoon } from "solid-icons/io"
import { BiSolidSun } from "solid-icons/bi"
import { Match, Switch, useContext } from "solid-js"

import { AppContext } from "../components/AppContext"

export default function Navbar() {
  const [state, { onToggleDarkMode, onToggleSidepanel }] =
    useContext(AppContext)

  const handleDarkMode = () => {
    onToggleDarkMode()
  }

  function handleToggleSidepanel() {
    onToggleSidepanel(!state.openSidepanel)
  }

  return (
    <nav className="h-16 sticky top-0 z-40 lg:z-50 w-full max-w-8xl mx-auto bg-white dark:bg-dark-bg flex flex-row justify-between border-b border-theme-border dark:border-dark-separators px-6">
      <div className="flex justify-start items-center">
        <button
          onClick={handleToggleSidepanel}
          aria-label="Toggle visibility of sidepanel"
        >
          <FiMenu className="text-2xl mr-2 sm:block md:hidden" />
        </button>
        <Link href="/">
          <h1 className="font-bold text-light-text-primary dark:text-dark-text-primary">
            solid-icons
          </h1>
        </Link>
      </div>
      <div className="flex justify-end items-center text-theme-main">
        <button
          className="flex flex-row items-center px-1 py-1 borde bg-gray-100 dark:bg-dark-card-bg rounded-full"
          onClick={handleDarkMode}
          aria-label="Toggle Dark/Light mode"
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
        <a
          href="https://github.com/x64Bits/solid-icons"
          target="_blank"
          rel="noreferrer noopener"
        >
          <button className="flex flex-row items-center px-2 py-1">
            <span className="text-light-text-secondary dark:text-dark-text-secondary">
              Github
            </span>{" "}
            <AiFillGithub className="ml-1 text-light-text-primary dark:text-dark-text-primary" />
          </button>
        </a>
      </div>
    </nav>
  )
}
