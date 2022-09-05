const env = import.meta.env;
const META_PATH = env.DEV ? "/public/meta.js" : "/meta.js";

export interface MetaFile {
  shortName: string;
  packName: string;
  license: string;
  url: string;
  path: string;
  count: number;
}

const getMetaFile = async (): Promise<MetaFile[]> =>
  await import(META_PATH).then((glob) => glob.default);

export default getMetaFile;
