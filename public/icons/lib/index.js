import { template, spread, insert, memo, effect, setAttribute, style } from 'solid-js/web';
import { splitProps } from 'solid-js';

const _tmpl$ = template(`<svg fill="currentColor" strokeWidth="0" xmlns="http://www.w3.org/2000/svg"></svg>`, 2),
      _tmpl$2 = template(`<title></title>`, 2);
function IconTemplate(props) {
  const [content, innerProps] = splitProps(props, ["src"]);
  return (() => {
    const _el$ = _tmpl$.cloneNode(true);

    spread(_el$, () => content.src.a, true, true);

    spread(_el$, innerProps, true, true);

    insert(_el$, (() => {
      const _c$ = memo(() => !!innerProps.title, true);

      return () => _c$() && (() => {
        const _el$2 = _tmpl$2.cloneNode(true);

        insert(_el$2, () => innerProps.title);

        return _el$2;
      })();
    })());

    effect(_p$ => {
      const _v$ = content.src.a.stroke,
            _v$2 = {
        overflow: "visible",
        color: innerProps.color,
        ...innerProps.style
      },
            _v$3 = innerProps.size || "1em",
            _v$4 = innerProps.size || "1em",
            _v$5 = content.src.c;

      _v$ !== _p$._v$ && setAttribute(_el$, "stroke", _p$._v$ = _v$);
      _p$._v$2 = style(_el$, _v$2, _p$._v$2);
      _v$3 !== _p$._v$3 && setAttribute(_el$, "height", _p$._v$3 = _v$3);
      _v$4 !== _p$._v$4 && setAttribute(_el$, "width", _p$._v$4 = _v$4);
      _v$5 !== _p$._v$5 && (_el$.innerHTML = _p$._v$5 = _v$5);
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined
    });

    return _el$;
  })();
}

export { IconTemplate as default };
