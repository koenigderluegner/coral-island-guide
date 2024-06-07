import { GeneratorList } from "./generator-list.type";
import { Item } from "@ci/data-types";

export const getLiveGenerators = (itemDbMap: Map<string, Item>) => ({} as const satisfies GeneratorList)
