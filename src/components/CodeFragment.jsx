import { BsCheckLg } from "solid-icons/bs"
import { IoCopy } from "solid-icons/io"
import { createEffect, Match, Switch } from "solid-js"
import Prism from "prismjs"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-bash"
import { createSignal } from "solid-js"

export default function CodeFragment(props) {
  const [copied, setCopied] = createSignal(false)
  const [code, setCode] = createSignal(props.code)

  createEffect(prev => {
    if (props.code !== prev) {
      const formatCode = Prism.highlight(
        props.code,
        Prism.languages[props.language],
        props.language
      )

      setCode(formatCode)
      setTimeout(() => Prism.highlightAll(), 0)
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
      <pre className="line-numbers py-3 px-2 rounded-lg text-dark-text-secondary dark:text-dark-text-secondary">
        <code
          className={`language-${props.language}`}
          innerHTML={code()}
        ></code>
      </pre>
      <div
        onClick={handleCopyFragment}
        className="bg bg-light-surface-bg dark:bg-dark-surface-bg dark:border-dark-surface-border border border-light-surface-border text-light-text-primary dark:text-dark-text-primary absolute top-2 right-2 p-2 rounded-lg cursor-pointer"
      >
        <Switch>
          <Match when={copied()}>
            <BsCheckLg className="animate-fade-in" />
          </Match>
          <Match when={!copied()}>
            <IoCopy className="animate-fade-in" />
          </Match>
        </Switch>
      </div>
    </div>
  )
}
