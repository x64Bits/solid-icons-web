const env = import.meta.env
const METADATA_SRC = env.DEV ? "/public" : ""

const PACK_PATH = `${METADATA_SRC}/meta.js`

export async function getPackMetadata() {
  return await import(PACK_PATH).then((meta) => meta.default)
}
