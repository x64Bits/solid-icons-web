export const isShowToolbar = location => location.pathname.includes("/search")

export function darkModeScrollbars(active) {
  document.documentElement.style.overflow = "hidden"
  // trigger reflow so that overflow style is applied
  document.body.clientWidth
  // change scheme
  document.documentElement.setAttribute(
    "data-color-scheme",
    active ? "light" : "dark"
  )
  // remove overflow style, which will bring back the scrollbar with the correct scheme
  document.documentElement.style.overflow = ""
}
