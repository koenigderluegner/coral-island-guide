import { CookingRecipe, Item, MinimalItem } from "@ci/data-types";
import { minifyItem } from "../util/functions";
import { nonNullable } from "@ci/util";

export class CookingRecipesChecklistGenerator {
    private assets: Record<string, CookingRecipe[]>;

    constructor(protected itemMap: Map<string, Item>, protected cookingMap: Map<string, Record<string, CookingRecipe[]>>) {
        this.assets = [...this.cookingMap.values()][0];

    }

    generate(): Map<string, Record<string, MinimalItem[]>> {

        const resObject: Record<string, MinimalItem[]> = {};

        Object.keys(this.assets).forEach(listName => {

            const entries = this.assets[listName]!;

            resObject[listName] = entries.map(entry => entry.item)
                .map(minifyItem)
                .filter(nonNullable);

        })

        const result = new Map<string, Record<string, MinimalItem[]>>;
        result.set('unused', resObject);
        return result;

    }
}
