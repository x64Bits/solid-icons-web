import { Route, Routes } from "@solidjs/router";
import Home from "./pages/home";
import PackageRoute from "./pages/package";
import SearchRoute from "./pages/search";

export default function Router() {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/search/:term" component={SearchRoute} />
      <Route path="/search/package/:shortName" element={PackageRoute} />
    </Routes>
  );
}
