export const installPackage = {
  yarn: `yarn add solid-icons`,
  npm: `npm install solid-icons --save`,
}

export const basicUsage = `  import { BiCompass } from 'solid-icons/bi'

  function MyComponent() {
    return (
      <div>
        <BiCompass size={24} color="#000000" />
        <p>SolidJS App</p>
      </div>
    )
  }`
