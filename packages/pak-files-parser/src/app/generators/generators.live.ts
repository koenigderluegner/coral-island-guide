import { GeneratorList } from "./generator-list.type";
import { Item, NPC } from "@ci/data-types";

export const getLiveGenerators = (itemDbMap: Map<string, Item>,  npcMap: Map<string, NPC>) => ({
    attractions: new (require('./attractions/attractions.generator').AttractionsGenerator)(itemDbMap, npcMap),
} as const satisfies GeneratorList)
