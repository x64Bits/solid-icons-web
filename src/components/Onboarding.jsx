import { createSignal } from "solid-js"
import CodeFragment from "./CodeFragment"

const installPackage = {
  yarn: `yarn add solid-icons`,
  npm: `npm install solid-icons --save`
}

const basicUsage = `  import { BiCompass } from 'solid-icons/bi'

  function MyComponent() {
    return (
      <div>
        <BiCompass size={24} color="#000000" />
        <p>...</p>
      </div>
    )
  }`

export default function Onboarding() {
  const [userManager, setUserManager] = createSignal("yarn")

  const onSetManager = selected => setUserManager(selected)

  return (
    <div className="flex flex-col px-52 mt-6 mb-10 self-end">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">
          Solid Icons
        </h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary px-32">
          A collection of <b>12</b> open source icon libraries packed into one
          for easy use in your solidjs project with over <b>13744</b> icons.
        </p>
        <div className="flex flex-col text-left mt-10">
          <div className="flex flex-row justify-between">
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Steps to use in your project
            </p>
            <div>
              {Object.keys(installPackage).map(manager => (
                <span
                  onClick={() => onSetManager(manager)}
                  className={`${
                    userManager() === manager
                      ? "underline cursor-default"
                      : "cursor-pointer"
                  } ml-3 text-light-text-secondary dark:text-dark-text-secondary`}
                >
                  {manager}
                </span>
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
