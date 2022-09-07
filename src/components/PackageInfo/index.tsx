import { Accessor, createEffect, createSignal, Show } from "solid-js";
import { HiOutlineExternalLink } from "solid-icons/hi";
import getMetaFile, { MetaFile } from "~/utils/get-meta-file";
import { Box, Col, Row, Text } from "../Common/styles";
import { PackName } from "./styles";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";

interface PackageInfoProps {
  shortName: Accessor<string>;
}

export default function PackageInfo(props: PackageInfoProps) {
  let containerEl: HTMLDivElement | undefined;
  const useVisibilityObserver = createVisibilityObserver({
    threshold: 0.1,
    initialValue: true,
  });
  const visible = useVisibilityObserver(() => containerEl);
  const [pack, setPack] = createSignal<MetaFile>();

  createEffect(async () => {
    const shortName = props.shortName().toLowerCase();

    const metaFile = await getMetaFile();

    const matchFile = (currentPack: MetaFile) =>
      currentPack.shortName === shortName;

    const payload = metaFile.find(matchFile);

    setPack(payload);
  });

  return (
    <Box mt="2em" ref={containerEl}>
      <Col justify="center" items="center" sm:justify="flex-start">
        <Show when={pack()}>
          <Show when={visible()}>
            <PackName>{pack().packName}</PackName>
          </Show>
          <Box mt="1.5em">
            <Row justify="center" items="center">
              <Box mx="0.5em">
                <Text size="1.2em">
                  License: <b>{pack().license}</b>
                </Text>
              </Box>
              <Box mx="0.5em">
                <Text color="accent" size="1.2em">
                  <a href={pack().url} target="_blank">
                    <Row justify="center" items="center">
                      Repository{" "}
                      <Box ml="0.2em">
                        {" "}
                        <HiOutlineExternalLink />
                      </Box>
                    </Row>
                  </a>
                </Text>
              </Box>
            </Row>
          </Box>
        </Show>
      </Col>
    </Box>
  );
}
