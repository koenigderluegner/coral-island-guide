import { GeneratorList } from "./generator-list.type";
import { Item, TagBasedItem } from "@ci/data-types";

export const getBetaGenerators = (itemDbMap: Map<string, Item>, tagBasedItemsDbMap: Map<string, TagBasedItem>) => ({} as const satisfies GeneratorList)
