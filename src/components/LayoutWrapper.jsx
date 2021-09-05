import { useContext } from "solid-js"
import { AppContext } from "../utils/AppContext"

export default function LayoutWrapper(props) {
  const [state] = useContext(AppContext)

  return (
    <div className={`${state.darkMode ? "dark bg-dark-bg" : "bg-white"}`}>
      {props.children}
    </div>
  )
}
