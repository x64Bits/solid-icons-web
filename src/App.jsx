import { lazy } from "solid-js"
import { Router, Routes, Route, Navigate } from "solid-app-router"

const Home = lazy(() => import("./pages/Home"))
const Icons = lazy(() => import("./pages/Icons"))

const AppContextProvider = lazy(() => import("./components/AppContext"))
const LayoutWrapper = lazy(() => import("./components/LayoutWrapper"))
const SearchContextProvider = lazy(() => import("./components/Search/Context"))

function App() {
  return (
    <Router>
      <SearchContextProvider>
        <AppContextProvider>
          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:term" element={<Icons />} />
              <Route path="/*all" element={<Navigate href="/" />} />
            </Routes>
          </LayoutWrapper>
        </AppContextProvider>
      </SearchContextProvider>
    </Router>
  )
}

export default App
