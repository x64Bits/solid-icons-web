import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { createEffect, createMemo, For, Show, useContext } from "solid-js";
import { useParams } from "solid-start/router";
import { Box, Row, Text } from "~/components/Common/styles";
import Icon from "~/components/Icon";
import IconPreview from "~/components/IconPreview";
import Layout from "~/components/Layout";
import { ContentLayout } from "~/components/Layout/styles";
import PackageInfo from "~/components/PackageInfo";
import Searchbar from "~/components/Searchbar";
import { usePackageList } from "~/hooks/use-icon-list";
import { AppContext } from "~/store/AppContext";
import { SearchbarContent, SearchbarWrapper } from "../../index.styles";
import { IconList, SearchContent } from "../term.styles";

export default function SearchPackage() {
  let contentRef: HTMLDivElement;
  let searchWrapperRef: HTMLDivElement;
  const params = useParams();
  const shortName = createMemo(() => params.shortName);
  const icons = usePackageList(shortName);
  const [state, { setVisibleNavSearch }] = useContext(AppContext);
  const useVisibilityObserver = createVisibilityObserver({
    threshold: 0.1,
    initialValue: false,
  });
  const visible = useVisibilityObserver(() => searchWrapperRef);

  createEffect(() => {
    setVisibleNavSearch(!visible());
  });

  createEffect(() => {
    if (params.shortName) {
      contentRef.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  return (
    <Layout activePackage={shortName()}>
      <ContentLayout ref={contentRef}>
        <SearchContent>
          <Box px="1em">
            <SearchbarContent ref={searchWrapperRef}>
              <SearchbarWrapper width="50%">
                <Searchbar />
                <Show when={icons().length}>
                  <Box mt="0.5em" ml="0.5em">
                    <Row justify="flex-start">
                      <Text color="textPrimary" size="1" weight="300">
                        Search Results:{" "}
                        <Text color="textPrimary" weight="bold">
                          {icons().length}
                        </Text>
                      </Text>
                    </Row>
                  </Box>
                </Show>
              </SearchbarWrapper>
            </SearchbarContent>
            <Show when={icons().length}>
              <PackageInfo shortName={shortName} />
              <Box mt="2em">
                <Row justify="center">
                  <IconList>
                    <For each={icons()}>
                      {(icon) => <Icon name={icon} term={params.term} />}
                    </For>
                  </IconList>
                </Row>
              </Box>
            </Show>
          </Box>
        </SearchContent>
      </ContentLayout>
      <Show when={state.activeIcon}>
        <IconPreview icons={icons} term="" />
      </Show>
    </Layout>
  );
}
