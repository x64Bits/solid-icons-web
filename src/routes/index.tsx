import { AiFillHeart } from "solid-icons/ai";
import { SiPnpm, SiYarn, SiNpm } from "solid-icons/si";
import { onMount, useContext } from "solid-js";
import Gradient from "~/assets/Gradient";
import Code from "~/components/Code";
import { Box, Col, Flex, Text } from "~/components/Common/styles";
import Layout from "~/components/Layout";
import { ContentLayout } from "~/components/Layout/styles";
import RecentlySearched from "~/components/RecentlySearched";
import Searchbar from "~/components/Searchbar";
import { AppContext } from "~/store/AppContext";
import {
  ContentContainer,
  ContentDescription,
  ContentMain,
  ContentTitle,
  GradientContainer,
  SearchbarContent,
  SearchbarWrapper,
} from "./index.styles";

const installSamples = [
  { title: "yarn", content: "yarn add solid-icons", icon: <SiYarn /> },
  { title: "npm", content: "npm install solid-icons", icon: <SiNpm /> },
  { title: "pnpm", content: "pnpm install solid-icons", icon: <SiPnpm /> },
];

const basicUseSample = [
  {
    title: "yarn",
    content: ` import { BiCompass } from 'solid-icons/bi'

  function MyComponent() {
      return (
          <div>
              <BiCompass size={24} color="#000000" />
              <p>SolidJS App</p>
          </div>
      )
  }`,
  },
];

export default function Home() {
  const [state, { setVisibleNavSearch }] = useContext(AppContext);
  onMount(() => {
    setVisibleNavSearch(false);
  });

  return (
    <Layout title="Home">
      <ContentLayout>
        <ContentMain>
          <GradientContainer>
            <Gradient width="100%" />
          </GradientContainer>
          <ContentContainer>
            <Box px="1em">
              <ContentTitle>Solid Icons</ContentTitle>
              <ContentDescription>
                A collection of <b>16</b> open source icon libraries packed into
                one for easy use in your SolidJS project with over <b>17734</b>{" "}
                icons.
              </ContentDescription>
              <SearchbarContent>
                <SearchbarWrapper>
                  <Searchbar />
                  <RecentlySearched />
                </SearchbarWrapper>
              </SearchbarContent>
              <Box mt="3em">
                <Text>Let's start by installing the library</Text>
              </Box>
              <Code
                samples={installSamples}
                lang="css"
                theme={state.darkMode ? "github-dark" : "github-light"}
                header
                locs
              />
              <Box mt="3em">
                <Text>Basic use</Text>
              </Box>
              <Code
                samples={basicUseSample}
                lang="jsx"
                theme={state.darkMode ? "github-dark" : "github-light"}
                header
                locs
              />
            </Box>
          </ContentContainer>
        </ContentMain>
        <Box mb="2em">
          <Flex justify="center" items="center">
            <Text color="secondary">
              Designed with <AiFillHeart /> by{" "}
              <Text color="accent">
                <a href="https://www.maite.design" target="_blank">
                  Maite Sojo
                </a>
              </Text>
            </Text>
          </Flex>
        </Box>
      </ContentLayout>
    </Layout>
  );
}
