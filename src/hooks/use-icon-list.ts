import { Accessor, createEffect, createSignal } from "solid-js";

const env = import.meta.env;
const SEARCH_SRC = env.DEV ? "/public" : "";

type TReturnProps = [Accessor<Array<string>>, Accessor<boolean>];

function getSearchFile() {
  return import(`${SEARCH_SRC}/search.js`).then((i) => i.default.icons);
}

export default function useIconList(term: Accessor<string>): TReturnProps {
  const [icons, setIcons] = createSignal<string[]>([]);
  const [loading, setLoading] = createSignal(false);

  createEffect(() => {
    setLoading(true);
    const termLowerCase = term().toLocaleLowerCase();

    getSearchFile().then((data) => {
      const result = data.filter((iconName: string) =>
        iconName.toLowerCase().includes(termLowerCase)
      );

      // TODO: Remove this
      setTimeout(() => {
        setIcons(result);
        setLoading(false);
      }, 750);
    });
  });

  return [icons, loading];
}

export function usePackageList(shortName: Accessor<string>) {
  const [icons, setIcons] = createSignal([]);

  createEffect(() => {
    const shortNameLowerCase = shortName().toLocaleLowerCase();

    getSearchFile().then((data) => {
      const result = data.filter(
        (iconName: string) =>
          iconName.toLowerCase().substring(0, 2) === shortNameLowerCase
      );

      setIcons(result);
    });
  });

  return icons;
}
