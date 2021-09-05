const ISPKG = (subString) => subString === "pkg:"

const env = import.meta.env
const DATA_SRC = env.DEV ? "/public" : ""

const getPkg = (term) => {
  const pkgName = term.split(":")[1]

  const fixVsc = pkgName === "vsc" ? "vs" : pkgName

  return fixVsc
}

export async function searchByTerm(data, term) {
  const subTerm = term.substring(0, 4)

  if (ISPKG(subTerm)) {
    const pkg = getPkg(term)

    const searchResult = data.filter(
      (iconName) => iconName.toLowerCase().substring(0, 2) === pkg
    )

    return { searchResult, pkg }
  }

  const searchResult = data.filter((iconName) =>
    iconName.toLowerCase().includes(term.toLowerCase())
  )

  return { searchResult }
}

export async function getPackageData(ID) {
  const metadata = await import(`${DATA_SRC}/meta.js`).then((i) => i.default)

  const currentPack = metadata.find((pack) => pack.path === ID)

  return currentPack
}
