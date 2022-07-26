import { createSignal } from "solid-js"

import CodeFragment from "../CodeFragment"
import { basicUsage, installPackage } from "./constants"

const DEFAULT_PACKAGE_MANAGER = "yarn"

const PackageManager = (props) => {
  const handleSet = () => props.onSet(props.manager)

  return (
    <span
      onClick={handleSet}
      className={`${
        props.userManager() === props.manager
          ? "underline cursor-default"
          : "cursor-pointer"
      } ml-3 text-light-text-secondary dark:text-dark-text-secondary`}
    >
      {props.manager}
    </span>
  )
}

export default function Onboarding() {
  const [userManager, setUserManager] = createSignal(DEFAULT_PACKAGE_MANAGER)

  const onSetManager = (selected) => setUserManager(selected)

  return (
    <div className="w-full lg:w-4/6 flex flex-col px-6 lg:px-12 md:px-10 mt-6 mb-10 relative">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">
          Solid Icons
        </h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary px-4 md:px-32">
          A collection of <b>16</b> open source icon libraries packed into one
          for easy use in your <b>SolidJS</b> project with over <b>17734</b>{" "}
          icons.
        </p>
        <div className="flex flex-col text-left mt-10">
          <div className="flex flex-row justify-between">
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Steps to use in your project
            </p>
            <div>
              {Object.keys(installPackage).map((manager) => (
                <PackageManager
                  manager={manager}
                  key={manager}
                  userManager={userManager}
                  onSet={onSetManager}
                />
              ))}
            </div>
          </div>
          <div className="mt-3">
            <CodeFragment
              code={installPackage[userManager()]}
              language="bash"
            />
          </div>
        </div>
        <div className="flex flex-col text-left mt-10">
          <div className="flex flex-row justify-between">
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Basic usage
            </p>
          </div>
          <div className="mt-3">
            <CodeFragment code={basicUsage} language="jsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
