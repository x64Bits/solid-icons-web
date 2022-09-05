export function darkModeScrollbars(active: boolean) {
  const html = document.documentElement;

  html.style.overflow = "hidden";
  // trigger reflow so that overflow style is applied
  document.body.clientWidth;
  // change scheme
  html.setAttribute("data-color-scheme", active ? "dark" : "light");
  // remove overflow style, which will bring back the scrollbar with the correct scheme
  html.style.overflow = "";
}
