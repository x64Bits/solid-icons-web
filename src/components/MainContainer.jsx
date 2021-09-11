import { useContext } from "solid-js"
import { AppContext } from "./AppContext"

export default function MainContainer(props) {
  const [state] = useContext(AppContext)
  return (
    <main
      className={`${
        state.openSidepanel ? "overflow-x-hidden" : "overflow-x-auto"
      } w-full`}
    >
      {props.children}
    </main>
  )
}
