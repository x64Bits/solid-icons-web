// @refresh reload
import { Links, Meta, Routes, Scripts } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";
import { Suspense } from "solid-js";
import GlobalStyles from "./components/Styles/GlobalStyles";
import Theme from "./components/Styles/Theme";
import AppContextProvider from "./store/AppContext";

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F4F8FF" />
        <title>Solid Icons</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorBoundary>
          <AppContextProvider>
            <Theme>
              <GlobalStyles />
              <Suspense>
                <Routes />
              </Suspense>
            </Theme>
          </AppContextProvider>
        </ErrorBoundary>
        <Scripts />
      </body>
    </html>
  );
}
