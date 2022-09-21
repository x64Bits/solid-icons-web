import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { createEffect, createMemo, For, Show, useContext } from "solid-js";
import { BsSlashCircleFill } from "solid-icons/bs";
import { useParams } from "@solidjs/router";
import { useTheme } from "solid-styled-components";

import { Box, Flex, Row, Text } from "~/components/Common/styles";
import Icon from "~/components/Icon";
import IconPreview from "~/components/IconPreview";
import IconsSkeleton from "~/components/IconsSkeleton";
import Layout from "~/components/Layout";
import { ContentLayout } from "~/components/Layout/styles";
import Searchbar from "~/components/Searchbar";

import useIconList from "~/hooks/use-icon-list";
import { AppContext } from "~/store/AppContext";

import { SearchbarContent, SearchbarWrapper } from "../home.styles";
import { IconList, SearchContent } from "./term.styles";

export default function SearchRoute() {
  let searchWrapperRef: HTMLDivElement | undefined = undefined;
  const params = useParams();
  const term = createMemo(() => params.term);
  const [icons, loading] = useIconList(term);
  const [state, { setVisibleNavSearch }] = useContext(AppContext);
  const useVisibilityObserver = createVisibilityObserver({
    threshold: 0.2,
    initialValue: true,
  });
  const visible = useVisibilityObserver(() => searchWrapperRef);
  const theme = useTheme();

  createEffect(() => {
    setVisibleNavSearch(!visible());
  });

  return (
    <Layout title={`Search: "${term()}"`}>
      <ContentLayout>
        <SearchContent>
          <Box px="1em">
            <SearchbarContent ref={searchWrapperRef}>
              <SearchbarWrapper width="50%">
                <Searchbar initialValue={params.term} />
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
            <Show when={!loading()} fallback={<IconsSkeleton count={30} />}>
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
            <Show when={!loading() && !icons().length}>
              <Box>
                <Flex justify="center" direction="column" items="center">
                  <BsSlashCircleFill
                    size="4em"
                    color={theme().colors.strokeAccent}
                  />
                  <Box mt="1.5em">
                    <Text size="2em" weight="300">
                      Your search term does not match any icon
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Show>
          </Box>
        </SearchContent>
      </ContentLayout>
      <Show when={state.activeIcon}>
        <IconPreview icons={icons} term={params.term} />
      </Show>
    </Layout>
  );
}
