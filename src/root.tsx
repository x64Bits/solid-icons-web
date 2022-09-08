// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import GlobalStyles from "./components/Styles/GlobalStyles";
import Theme from "./components/Styles/Theme";
import AppContextProvider from "./store/AppContext";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Solid Icons</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <ErrorBoundary>
          <Suspense>
            <AppContextProvider>
              <Theme>
                <GlobalStyles />
                <Routes>
                  <FileRoutes />
                </Routes>
              </Theme>
            </AppContextProvider>
            <Scripts />
          </Suspense>
        </ErrorBoundary>
      </Body>
    </Html>
  );
}
