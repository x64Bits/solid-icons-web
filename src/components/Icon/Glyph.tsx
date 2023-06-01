import { IconTemplate, IconTree } from "solid-icons/lib/index.js";
import { createEffect, createSignal } from "solid-js";
import { IconPlaceholder } from "./styles";

const JS_DELIVR = import.meta.env.PROD
  ? "https://cdn.jsdelivr.net/npm/solid-icons-all"
  : "/public/dist_all";
const DEFAULT_ICON = "BsSquareFill";

interface IGlyphProps {
  name: string;
}

function getPath(name = DEFAULT_ICON) {
  const packID = name.slice(0, 2).toLowerCase();

  const path = `${JS_DELIVR}/${packID}/${name}.js`;

  return path;
}

export default function Glyph(props: IGlyphProps) {
  const [iconString, setIconString] = createSignal<IconTree>({ a: {}, c: "" });

  createEffect(async () => {
    const name = (props && props.name) || "";

    const iconTree = await import(getPath(name) /* @vite-ignore */).then(
      (i) => i.default
    );
    setIconString(iconTree);
  });
  return (
    <>
      {!!iconString().c ? (
        <div>{IconTemplate(iconString(), {})}</div>
      ) : (
        <IconPlaceholder size="44%" class="icon-placeholder" />
      )}
    </>
  );
}
