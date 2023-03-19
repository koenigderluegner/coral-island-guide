import { CookingRecipe, Item, MinimalItem, TagBasedItem, UnlockByMastery } from "@ci/data-types";
import { minifyItem, readAsset, removeQualityFlag } from "../util/functions";
import { RawCookingRecipe } from "../interfaces/raw-cooking-recipe.interface";
import { getEnumValue } from "@ci/util";
import { CookingRecipes } from "../types/cooking-recipes.type";

export class CookingDbGenerator {

    // ProjectCoral Content ProjectCoral Data Cooking
    datatable: CookingRecipes = readAsset('DT_CookingRecipes.json');

    handleEntry(dbItem: RawCookingRecipe): CookingRecipe | undefined {
        const itemKey = dbItem.result.itemID;

        let additionsToGenerics: Record<string, MinimalItem[]> | undefined = undefined;

        const ingredients: CookingRecipe["ingredients"] = [];
        const eitherOrIngredients: CookingRecipe["eitherOrIngredients"] = [];

        const genericIngredients = dbItem.genericIngredients.map(genericIngredient => {
            return {
                amount: genericIngredient.amount,
                genericItem: this.tagBasedItemMap.get(genericIngredient.genericItem.RowName),
                key: genericIngredient.genericItem.RowName,
            }
        });


        const genericTags: string[] = genericIngredients.map(genericIngredient => genericIngredient.genericItem?.tags ?? []).flat()

        dbItem.ingredients.forEach(ingredient => {


            let ingredientList: { item: Item, amount: number }[] = []

            ingredient.listIngredients.forEach(lIngredient => {
                const item = this.itemMap.get(removeQualityFlag(lIngredient.itemData.itemID));

                if (item && !ingredientList.find(ingredient => ingredient.item?.id === item.id) && !item.tags?.some(tag => genericTags.includes(tag)))
                    ingredientList.push({item: (item), amount: lIngredient.quantity})
            });


            if (ingredient.useCustomName) {
                const tagName = ingredient.customName.SourceString;

                const foundGenericIngredient = genericIngredients.find(genericIngredient => genericIngredient.genericItem?.displayName === tagName);
                const foundTagBasedItem = [...this.tagBasedItemMap.values()].find(tbi => tbi.displayName === tagName);
                let nonMatchingIngredients = ingredientList.filter(ingredient => !ingredient.item.tags?.some(tag => foundGenericIngredient?.genericItem?.tags.includes(tag)))

                if (nonMatchingIngredients.length) {

                    // add generic if none is set
                    if (!foundGenericIngredient && foundTagBasedItem) {
                        genericIngredients.push({
                            genericItem: foundTagBasedItem,
                            amount: nonMatchingIngredients[0].amount,
                            key: foundTagBasedItem.key
                        });
                        ingredientList = ingredientList.filter(ingredient => !nonMatchingIngredients.some(nmi => nmi.item.id === ingredient.item.id));

                    }

                    if (!!foundGenericIngredient && ingredientList.length > 0) {
                        if (!additionsToGenerics) {
                            additionsToGenerics = {}
                        }

                        const index = foundGenericIngredient.genericItem?.displayName ?? foundGenericIngredient.key;

                        if (!Array.isArray(additionsToGenerics[index])) {

                            additionsToGenerics[index] = []
                        }

                        ingredientList.forEach(ingredient => additionsToGenerics?.[index].push(minifyItem(ingredient.item)));

                        ingredientList = [];
                    }

                }

            }


            const minifiedIngredientList = ingredientList.map(ingredient => {
                return {
                    item: minifyItem(ingredient.item),
                    amount: ingredient.amount
                }
            })


            if (ingredientList.length > 1) {
                eitherOrIngredients.push(minifiedIngredientList)
            } else {
                ingredients.push(...minifiedIngredientList);
            }
        })

        return {
            key: itemKey,
            amount: 1, // currently always 1
            item: this.itemMap.get(itemKey),
            craftingUnlock: this.cookingUnlockMap.get(itemKey),
            utensils: dbItem.utensils.map(utensil => getEnumValue(utensil)),
            genericIngredients,
            ingredients,
            eitherOrIngredients,
            additionsToGenerics

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
