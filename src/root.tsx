// @refresh reload
import {
  Body,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
} from "solid-start";
import { ErrorBoundary } from "solid-start/error-boundary";
import { Suspense } from "solid-js";
import GlobalStyles from "./components/Styles/GlobalStyles";
import Theme from "./components/Styles/Theme";
import AppContextProvider from "./store/AppContext";

export default function Root() {
  return (
    <Html lang="en">
      <head>
        <Head />
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="theme-color" content="#F4F8FF" />
        <title>Solid Icons</title>
      </head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <AppContextProvider>
              <Theme>
                <GlobalStyles />
                <Routes>
                  <FileRoutes />
                </Routes>
              </Theme>
            </AppContextProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
