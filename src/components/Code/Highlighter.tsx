import { getHighlighter, Lang, setCDN, Theme } from "shiki";
import { createEffect, createMemo, createSignal } from "solid-js";
import { HighlighterContainer } from "./styles";

interface IHighlighterProps {
  children: string;
  lang: Lang;
  theme?: Theme;
}

const getCode = async (code: string, theme: Theme, lang: Lang) => {
  // Local
  // setCDN("/node_modules/shiki/");
  setCDN("https://unpkg.com/shiki/");

  return await getHighlighter({
    theme: theme || "solarized-light",
    langs: [lang],
  }).then((highlighter) => {
    return highlighter.codeToHtml(code, { lang: lang });
  });
};

export default function Highlighter(props: IHighlighterProps) {
  const [html, setHtml] = createSignal<string>();

  createEffect(async () => {
    setHtml(await getCode(props.children, props.theme, props.lang));
  });

  return <HighlighterContainer innerHTML={html()} />;
}
