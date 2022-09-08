import { IoClose } from "solid-icons/io";
import { Accessor, createMemo, Show, useContext } from "solid-js";
import { AppContext } from "~/store/AppContext";
import Code from "../Code";
import { Box, Text } from "../Common/styles";
import Glyph from "../Icon/Glyph";
import NextIcons from "../NextIcons";

import {
  CloseButton,
  PreviewContent,
  PreviewCopyContainer,
  PreviewIconContainer,
  PreviewIconWrapper,
  PreviewModal,
  PreviewOverlay,
} from "./styles";

interface IconPreviewProps {
  icons: Accessor<string[]>;
  term: string;
}

const NEXT_ICONS_LIMIT = 6;

const getNextIcons = (icons: string[], active: string) => {
  const iconIndex = icons.indexOf(active) + 1;
  const stopIndex = iconIndex + NEXT_ICONS_LIMIT;
  let resultIcons = [];

  for (let index = iconIndex; index < stopIndex; index++) {
    const element = icons[index];
    if (element) resultIcons.push(element);
  }

  return resultIcons;
};

export default function IconPreview(props: IconPreviewProps) {
  const [state, { setActiveIcon }] = useContext(AppContext);
  const packageShortName = createMemo(() =>
    state.activeIcon.substring(0, 2).toLowerCase()
  );
  const nextIcons = createMemo(() =>
    getNextIcons(props.icons(), state.activeIcon)
  );

  const importSamples = createMemo(() => [
    {
      content: `import { ${
        state.activeIcon
      } } from 'solid-icons/${packageShortName()}'`,
    },
  ]);

  const jsxSample = createMemo(() => [
    {
      content: `<${state.activeIcon} size={24} color="#000000" />`,
    },
  ]);

  const handleModalClick = (e: MouseEvent) => e.stopPropagation();

  function handleClose() {
    setActiveIcon(null);
  }

  return (
    <PreviewOverlay onClick={handleClose}>
      <PreviewModal onClick={handleModalClick}>
        <CloseButton onClick={handleClose}>
          <IoClose />
        </CloseButton>
        <PreviewContent>
          <PreviewIconContainer>
            <Text>{state.activeIcon}</Text>
            <PreviewIconWrapper>
              <Glyph name={state.activeIcon} />
            </PreviewIconWrapper>
          </PreviewIconContainer>
          <PreviewCopyContainer>
            <Text>Import icon from library</Text>
            <Code
              samples={importSamples()}
              lang="jsx"
              theme="solarized-light"
            />
            <Box mt="2em">
              <Text>Render the icon</Text>
              <Code samples={jsxSample()} lang="jsx" theme="solarized-light" />
            </Box>
          </PreviewCopyContainer>
        </PreviewContent>
        <Show when={nextIcons().length}>
          <NextIcons nextIcons={nextIcons()} term={props.term} />
        </Show>
      </PreviewModal>
    </PreviewOverlay>
  );
}
