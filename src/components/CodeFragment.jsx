import { FiCheck } from "solid-icons/fi"
import { IoCopy } from "solid-icons/io"
import { createEffect, Match, Show, Switch } from "solid-js"
import Prism from "prismjs"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-bash"
import { createSignal } from "solid-js"

function handleFormatCode(code, lang) {
  const formatCode = Prism.highlight(code, Prism.languages[lang], lang)

  setTimeout(() => Prism.highlightAll(), 0)

  return formatCode
}

export default function CodeFragment(props) {
  const [copied, setCopied] = createSignal(false)
  const [code, setCode] = createSignal(
    handleFormatCode(props.code, props.language)
  )

  createEffect((prev) => {
    if (props.code !== prev) {
      const result = handleFormatCode(props.code, props.language)
      setCode(result)
    }

    return props.code
  }, null)

  function handleCopyFragment() {
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
    navigator.clipboard.writeText(props.code)
  }

  return (
    <div className="relative">
      <Show when={code()}>
        <pre className="line-numbers py-3 px-2 rounded-lg text-dark-text-secondary dark:text-dark-text-secondary">
          <code
            className={`language-${props.language}`}
            innerHTML={code()}
          ></code>
        </pre>
      </Show>
      <div
        onClick={handleCopyFragment}
        className="bg bg-light-surface-bg dark:bg-dark-surface-bg dark:border-dark-surface-border border border-light-surface-border text-light-text-primary dark:text-dark-text-primary absolute top-2 right-2 p-2 rounded-lg cursor-pointer"
      >
        <Switch>
          <Match when={copied()}>
            <div className="flex flex-row justify-center items-center">
              <span className="mr-1 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Copied!
              </span>
              <FiCheck className="animate-fade-in" />
            </div>
          </Match>
          <Match when={!copied()}>
            <IoCopy className="animate-fade-in" />
          </Match>
        </Switch>
      </div>
    </div>
  )
}
