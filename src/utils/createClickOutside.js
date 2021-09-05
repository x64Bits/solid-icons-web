import { onCleanup } from "solid-js"
import { createEffect } from "solid-js"
import { includeElements } from "../components/IconPreview/constants"

function isAnotherIcon(target) {
  if (target && target.className.length) {
    return includeElements.some(el => target.className.includes(el))
  }

  return target.namespaceURI.includes("svg")
}

export function createClickOutside(el, callback) {
  function handleClickOutside(event) {
    if (el && !el.contains(event.target) && !isAnotherIcon(event.target)) {
      callback()
    }
  }

  createEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
  })

  onCleanup(() => document.removeEventListener("mousedown", handleClickOutside))
}
