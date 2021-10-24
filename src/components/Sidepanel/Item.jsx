import { NavLink } from "solid-app-router"

function SidePanelItem(props) {
  return (
    <li className="flex">
      <NavLink
        className="px-3 py-2 mx-3 cursor-pointer rounded-md hover:bg-flat-card hover:border-theme-border"
        replace={true}
        href={`/search/pkg:${props.path}`}
        onClick={props.onHide}
      >
        {" "}
        {props.name}
      </NavLink>
    </li>
  )
}

export default SidePanelItem
