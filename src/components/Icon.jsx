import {
  createEffect,
  createSignal,
  Show,
  splitProps,
  Suspense,
  useContext,
} from "solid-js"
import { BsSquareFill as DefaultIcon } from "solid-icons/bs"
import { createViewportObserver } from "../utils/createInterception"
import { IconTemplate } from "solid-icons/lib/browser/IconWrapper"
import { AppContext } from "../components/AppContext"

const env = import.meta.env

const iconsPackage = env.DEV ? "/public/icons" : "/icons"

function getPath(name = "BsSquareFill") {
  const packNomenclature = name.slice(0, 2).toLowerCase()

  const path = `${iconsPackage}/${packNomenclature}/${name}.js`

  return path
}

export function Icon(props) {
  const [iconString, setIconString] = createSignal()

  createEffect(async () => {
    const name = (props && props.name) || ""

    const iconJSON = await import(getPath(name)).then((i) => i.default)

    setIconString(iconJSON)
  })

  return (
    <Suspense fallback={<DefaultIcon />}>
      {iconString() && <div>{IconTemplate(iconString(), props)}</div>}
    </Suspense>
  )
}

export default function IconContainer(props) {
  const [name, setName] = createSignal()
  const [renderName, setRenderName] = createSignal()
  const [visible, setVisible] = createSignal(false)
  const [add] = createViewportObserver([], 0.1)
  const [_, { onSetIconPreview }] = useContext(AppContext)

  const [meta, iconProps] = splitProps(props, ["wrapperClass", "pattern"])

  const observer = (el, entry) => {
    const [getter, setter] = entry()
    add(el, (entry) => {
      setter(entry.isIntersecting)
    })
  }

  const highlightedName = (name, pattern) => {
    if (pattern)
      return name
        .split(pattern)
        .map((part) =>
          part.match(pattern)
            ? `<b class="text-accent-main">${part}</b>`
            : `${part}`
        )
        .join("")
    return name
  }

  createEffect(() => {
    const highlighted = highlightedName(iconProps.name, meta.pattern)

    setRenderName(highlighted)
    setName(iconProps.name)
  })

  function onClick() {
    onSetIconPreview(name())
  }

  return (
    <div
      className={meta.wrapperClass}
      onClick={onClick}
      use:observer={[visible, setVisible]}
    >
      <Show when={visible()}>
        <Icon {...iconProps} />
        <span
          className="text-sm mt-2 w-24 break-words text-center icon-name"
          innerHTML={renderName() ? renderName() : "Loading..."}
        ></span>
      </Show>
    </div>
  )
}
