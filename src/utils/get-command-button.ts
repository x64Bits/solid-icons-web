import { isServer } from "solid-js/web";
import { INavigator } from "~/types/navigator";

export default function getCommandButton() {
  if (isServer) {
    return "Ctrl";
  }

  const browserNavigator = navigator as INavigator;
  let platform =
    browserNavigator?.userAgentData?.platform ||
    navigator?.platform ||
    "unknown";

  switch (platform) {
    case "macOS":
      return "⌘";

    default:
      return "Ctrl";
  }
}
