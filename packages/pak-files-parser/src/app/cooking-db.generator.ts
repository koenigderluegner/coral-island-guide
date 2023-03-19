import { Item, TagBasedItem, UnlockByMastery } from "@ci/data-types";
import { minifyItem, readAsset, removeQualityFlag } from "../util/functions";
import { RawCookingRecipe } from "../interfaces/raw-cooking-recipe.interface";
import { CookingRecipe } from "../../../data-types/src/lib/interfaces/cooking-recipe.interface";
import { getEnumValue } from "@ci/util";
import { CookingRecipes } from "../types/cooking-recipes.type";

export class CookingDbGenerator {

    datatable: CookingRecipes = readAsset('DT_CookingRecipes.json');

    handleEntry(dbItem: RawCookingRecipe): CookingRecipe | undefined {
        const itemKey = dbItem.result.itemID;

        const ingredients: CookingRecipe["ingredients"] = [];

        const genericIngredients = dbItem.genericIngredients.map(genericIngredient => {
            return {
                amount: genericIngredient.amount,
                genericItem: this.tagBasedItemMap.get(genericIngredient.genericItem.RowName),
                key: genericIngredient.genericItem.RowName,
            }
        });


        const genericTags: string[] = genericIngredients.map(genericIngredient => genericIngredient.genericItem?.tags ?? []).flat()


        dbItem.ingredients.forEach(ingredient => {
            ingredient.listIngredients.forEach(lIngredient => {
                const item = this.itemMap.get(removeQualityFlag(lIngredient.itemData.itemID));

                if (item && !ingredients.find(ingredient => ingredient.item?.id === item.id) && !item.tags?.some(tag => genericTags.includes(tag)))
                    ingredients.push({item: minifyItem(item), amount: lIngredient.quantity})
            })
        })


        return {
            key: itemKey,
            amount: 1, // currently always 1
            item: this.itemMap.get(itemKey),
            craftingUnlock: this.cookingUnlockMap.get(itemKey),
            utensils: dbItem.utensils.map(utensil => getEnumValue(utensil)),
            genericIngredients,
            ingredients

        }
    }

    constructor(
        protected itemMap: Map<string, Item>,
        protected cookingUnlockMap: Map<string, UnlockByMastery>,
        protected tagBasedItemMap: Map<string, TagBasedItem>
    ) {

    }

    generate(): Map<string, Record<string, CookingRecipe[]>> {
        const cookingMap: Record<string, CookingRecipe[]> = {}
        Object.keys(this.datatable?.[0]?.Rows).forEach(itemKey => {
            const dbItem = this.getDBItem(itemKey);
            const entry: CookingRecipe | undefined = this.handleEntry(dbItem);

            if (entry === undefined) return;

            entry.utensils.forEach(utensil => {

                if (!Array.isArray(cookingMap[utensil])) {
                    cookingMap[utensil] = []
                }

                cookingMap[utensil].push(entry);
            });


        });

        return new Map<string, Record<string, CookingRecipe[]>>([
                ['unsued', cookingMap]
            ]
        );
    }

    getDBItem(itemKey: string): RawCookingRecipe {
        return this.datatable?.[0]?.Rows[itemKey];
    }

}
