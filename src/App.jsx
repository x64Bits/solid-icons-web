import { lazy } from "solid-js"
import { Routes, Route, Router, Navigate } from "solid-app-router"

import "./assets/syntax.css"

const Home = lazy(() => import("./pages/Home"))
const Icons = lazy(() => import("./pages/Icons"))

import Navbar from "./components/Navbar"
const Sidepanel = lazy(() => import("./components/Sidepanel"))
const Toolbar = lazy(() => import("./components/Toolbar"))

const AppContextProvider = lazy(() => import("./utils/AppContext"))
const LayoutWrapper = lazy(() => import("./components/LayoutWrapper"))
const SearchContextProvider = lazy(() => import("./components/Search/Context"))

function App() {
  return (
    <Router>
      <SearchContextProvider>
        <AppContextProvider>
          <LayoutWrapper>
            <Navbar />
            <div className="w-full grid grid-cols-6 min-h-screen pt-16">
              <Sidepanel />
              <main className="col-span-5 col-start-2">
                <Toolbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search/:term" element={<Icons />} />
                  <Route path="/*all" element={<Navigate href="/" />} />
                </Routes>
              </main>
            </div>
          </LayoutWrapper>
        </AppContextProvider>
      </SearchContextProvider>
    </Router>
  )
}

export default App
