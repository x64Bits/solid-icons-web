export const isCompact = (location) => {
  if (!location.pathname) {
    return false
  }

  return location.pathname.includes("/search")
}

export function darkModeScrollbars(active) {
  const html = document.documentElement

  html.style.overflow = "hidden"
  // trigger reflow so that overflow style is applied
  document.body.clientWidth
  // change scheme
  html.setAttribute("data-color-scheme", active ? "light" : "dark")
  // remove overflow style, which will bring back the scrollbar with the correct scheme
  html.style.overflow = ""
}
