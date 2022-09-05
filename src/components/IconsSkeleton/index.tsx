import { createMemo, For } from "solid-js";
import { IconList } from "~/routes/search/term.styles";
import { Box, PulseView, Row } from "../Common/styles";
import { IconContainer, IconPlaceholder } from "../Icon/styles";
import { IconsListFull } from "./styles";

interface IconsSkeletonProps {
  count?: number;
}

export default function IconsSkeleton(props: IconsSkeletonProps) {
  const count = createMemo(() => Array(props.count || 30).fill(""));

  return (
    <Box mt="2em">
      <Row>
        <IconsListFull>
          <For each={count()}>
            {() => (
              <IconContainer>
                <IconPlaceholder size="44%" color="focus" />
                <Box px="1em" mt="1em">
                  <PulseView
                    width="100%"
                    height="0.5em"
                    color="focus"
                    rounded="999px"
                  />
                </Box>
              </IconContainer>
            )}
          </For>
        </IconsListFull>
      </Row>
    </Box>
  );
}
