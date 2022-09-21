import { IconTemplate, IconTree } from "solid-icons/lib/index.js";
import { createEffect, createSignal } from "solid-js";
import { IconPlaceholder } from "./styles";

const JS_DELIVR = "https://cdn.jsdelivr.net/npm/solid-icons-all";
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

    const iconTree = await import(getPath(name)).then((i) => i.default);
    setIconString(iconTree);
  });
  return (
    <>
      {!!iconString().c ? (
        <div id="glyph-svg-container">{IconTemplate(iconString(), {})}</div>
      ) : (
        <IconPlaceholder size="44%" class="icon-placeholder" />
      )}
    </>
  );
}
