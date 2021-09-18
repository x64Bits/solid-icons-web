import { lazy } from "solid-js"
import { useContext } from "solid-js"

import { AppContext } from "../components/AppContext"

import Navbar from "./Navbar"
import Sidepanel from "./Sidepanel"
const Toolbar = lazy(() => import("./Toolbar"))
const MainContainer = lazy(() => import("./MainContainer"))

export default function LayoutWrapper(props) {
  const [state] = useContext(AppContext)

  return (
    <div className={`${state.darkMode ? "dark bg-dark-bg" : "light bg-white"}`}>
      <Navbar />
      <MainContainer>
        <div className="lg:flex">
          <Sidepanel />
          <div className="min-w-0 flex-auto pb-24 lg:pb-16 flex flex-col items-center">
            <Toolbar />
            {props.children}
          </div>
        </div>
      </MainContainer>
    </div>
  )
}
