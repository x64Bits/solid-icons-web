export const templateImport = (name, pack) =>
  `import { ${name} } from 'solid-icons/${pack}'`

export const templateRender = (name) => `<${name} size={24} color="#000000"/>`

export const includeElements = ["icon-container", "icon-svg", "icon-name"]

export function getPackId(name = "") {
  const packNomenclature = (name && name.slice(0, 2).toLowerCase()) || ""

  return packNomenclature
}
