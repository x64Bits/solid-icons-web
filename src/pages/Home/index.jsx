import { onMount, useContext } from "solid-js"

import Onboarding from "../../components/Onboarding"
import { SearchContext } from "../../components/Search/Context"

function Home() {
  const [_, { onToggleCompact }] = useContext(SearchContext)

  onMount(() => onToggleCompact(false))

  return <Onboarding />
}

export default Home
