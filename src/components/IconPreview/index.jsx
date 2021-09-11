import { onMount } from "solid-js"
import { createSignal } from "solid-js"
import { createEffect, useContext } from "solid-js"
import { AppContext } from "../../components/AppContext"
import { createClickOutside } from "../../utils/createClickOutside"

import CodeFragment from "../CodeFragment"
import Icon from "../Icon"
import { getPackId, templateImport, templateRender } from "./constants"

export default function IconPreview() {
  const [state, { onSetIconPreview }] = useContext(AppContext)
  const [iconName, setIconName] = createSignal()
  const [iconPack, setIconPack] = createSignal()
  const [hide, setHide] = createSignal(false)

  function onHide() {
    setHide(true)
    setTimeout(() => onSetIconPreview(null), 250)
  }

  let previewEl
  onMount(() => createClickOutside(previewEl, () => onHide()))

  createEffect(() => {
    setIconName(state.iconPreview)
    setIconPack(getPackId(state.iconPreview))
  })

  return (
    <div
      ref={previewEl}
      className={`${
        hide() ? "animate-slide-out" : "animate-slide-in"
      } fixed bottom-6 icon-preview py-5 left-0 right-0 md:mr-auto md:ml-auto mx-3 rounded-2xl flex items-center flex-col md:flex-row md:mx-0 shadow-lg bg-white dark:bg-dark-card-bg dark:border-dark-card-border border border-theme-border`}
    >
      <Icon
        wrapperClass="flex flex-col items-center justify-center h-32 w-36 mx-2 my-2 rounded-lg text-light-text-secondary dark:text-dark-text-secondary"
        size="2.5rem"
        name={iconName()}
      />
      <div className="flex flex-col w-full px-5 relative">
        <span className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
          Import icon from library
        </span>
        <div className="relative max-w-lg">
          <CodeFragment
            code={templateImport(iconName(), iconPack())}
            language="js"
          />
        </div>
        <span className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
          Import icon from library
        </span>
        <div className="relative max-w-lg">
          <CodeFragment code={templateRender(iconName())} language="jsx" />
        </div>
      </div>
    </div>
  )
}
