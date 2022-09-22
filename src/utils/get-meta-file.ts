export interface MetaFile {
  shortName: string;
  packName: string;
  license: string;
  url: string;
  path: string;
  count: number;
}

const getMetaFile = async (): Promise<MetaFile[]> =>
  await import("../assets/meta.js" as any).then((glob) => glob.default);

export default getMetaFile;
