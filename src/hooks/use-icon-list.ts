import { Accessor, createEffect, createSignal } from "solid-js";

type TReturnProps = [Accessor<Array<string>>, Accessor<boolean>];

function getSearchFile() {
  return import("../assets/search.js" as any).then((i) => i.default.icons);
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
      setIcons(result);
      setLoading(false);
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
