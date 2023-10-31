import { CookingRecipe, Item, MinimalItem, TagBasedItem, UnlockByMastery } from "@ci/data-types";
import { minifyItem, readAsset } from "../util/functions";
import { CookingIngredients, RawCookingRecipe } from "../interfaces/raw-data-interfaces/raw-cooking-recipe.interface";
import { getEnumValue, removeQualityFlag } from "@ci/util";
import { CookingRecipes } from "../types/cooking-recipes.type";
import { StringTable } from "../util/string-table.class";

export class CookingDbGenerator {

    datatable: CookingRecipes = readAsset('ProjectCoral/Content/ProjectCoral/Data/Cooking/DT_CookingRecipes.json');

    constructor(
        protected itemMap: Map<string, Item>,
        protected cookingUnlockMap: Map<string, UnlockByMastery>,
        protected tagBasedItemMap: Map<string, TagBasedItem>
    ) {

    }

    handleEntry(dbItem: RawCookingRecipe, cookingKey: string): CookingRecipe | undefined {
        const itemKey = dbItem.result.itemID;

        if (itemKey === 'None') return;

        let additionsToGenerics: Record<string, MinimalItem[]> | undefined = undefined;

        const ingredients: CookingRecipe["ingredients"] = [];
        const eitherOrIngredients: CookingRecipe["eitherOrIngredients"] = [];

        const genericIngredients = dbItem.genericIngredients.map(genericIngredient => {
            let foundGenericItem = this.tagBasedItemMap.get(genericIngredient.genericItem.RowName);
            let genericItem: Omit<TagBasedItem, 'items'> & { items?: MinimalItem[] } | undefined = undefined;
            if (foundGenericItem) {
                genericItem = {...foundGenericItem}
                delete genericItem.items
            }
            return {
                amount: genericIngredient.amount,
                genericItem: genericItem,
                key: genericIngredient.genericItem.RowName,
            }
        });


        const genericTags: string[] = genericIngredients.map(genericIngredient => genericIngredient.genericItem?.tags ?? []).flat()

        dbItem.ingredients.forEach(ingredient => {


            let ingredientList: { item: Item, amount: number }[] = this._initialIngredientList(ingredient, genericTags);


            if (ingredient.useCustomName) {
                const tagName = StringTable.getString(ingredient.customName) ?? '';

                const foundGenericIngredient = genericIngredients.find(genericIngredient => genericIngredient.genericItem?.displayName === tagName);
                const foundTagBasedItem = [...this.tagBasedItemMap.values()].find(tbi => tbi.displayName === tagName);
                let nonMatchingIngredients = ingredientList.filter(ingredient => !ingredient.item.tags?.some(tag => foundGenericIngredient?.genericItem?.tags.includes(tag)))
                const isMissingGenericIngredient = !foundGenericIngredient && foundTagBasedItem;


                if (nonMatchingIngredients.length) {

                    // add generic if none is set
                    if (isMissingGenericIngredient) {
                        ingredientList = this._addGenericIngredient(genericIngredients, foundTagBasedItem, nonMatchingIngredients, ingredientList);

                    }

                    if (!!foundGenericIngredient && ingredientList.length > 0) {
                        if (!additionsToGenerics) {
                            additionsToGenerics = {}
                        }

                        const genericDisplayName = foundGenericIngredient.genericItem?.displayName ?? foundGenericIngredient.key;

                        if (!Array.isArray(additionsToGenerics[genericDisplayName])) {

                            additionsToGenerics[genericDisplayName] = []
                        }

                        ingredientList.forEach(ingredient => {

                            if (!additionsToGenerics?.[genericDisplayName].find(minifiedItem => minifiedItem.id === ingredient.item.id))
                                additionsToGenerics?.[genericDisplayName].push(minifyItem(ingredient.item))
                        });

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

        const item = this.itemMap.get(itemKey);

        if (!item) {
            console.log('Missing item for cooking recipe!', itemKey)
            return;
        }

        return {
            key: itemKey,
            amount: 1, // currently always 1
            cookingKey,
            item,
            craftingUnlock: this.cookingUnlockMap.get(itemKey),
            utensils: dbItem.utensils.map(utensil => getEnumValue(utensil)),
            genericIngredients,
            ingredients,
            eitherOrIngredients,
            additionsToGenerics

        }
    }

    generate(): Map<string, Record<string, CookingRecipe[]>> {
        const cookingMap: Record<string, CookingRecipe[]> = {}
        Object.keys(this.datatable?.[0]?.Rows).forEach(itemKey => {
            const dbItem = this.getDBItem(itemKey);
            const entry: CookingRecipe | undefined = this.handleEntry(dbItem, itemKey);

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

    private _addGenericIngredient(genericIngredients: {
        amount: number;
        key: string;
        genericItem: Omit<TagBasedItem, 'items'> | undefined
    }[], foundTagBasedItem: TagBasedItem, nonMatchingIngredients: { item: Item; amount: number }[], ingredientList: {
        item: Item;
        amount: number
    }[]) {

        const {items: [], ...genericItem} = foundTagBasedItem;

        genericIngredients.push({
            genericItem,
            amount: nonMatchingIngredients[0].amount,
            key: foundTagBasedItem.key
        });
        return ingredientList.filter(ingredient => !nonMatchingIngredients.some(nmi => nmi.item.id === ingredient.item.id));
    }

    private _initialIngredientList(ingredient: CookingIngredients, genericTags: string[]): {
        item: Item;
        amount: number
    }[] {
        const ingredientList: { item: Item; amount: number }[] = []

        ingredient.listIngredients.forEach(lIngredient => {
            const item = this.itemMap.get(removeQualityFlag(lIngredient.itemData.itemID));

            const hasTagFromGeneric = item?.tags?.some(tag => genericTags.includes(tag));
            const alreadyInList = ingredientList.find(ingredient => ingredient.item?.id === item?.id);

            const isItemViableForList = item && !alreadyInList && !hasTagFromGeneric;
            if (isItemViableForList)
                ingredientList.push({item: (item), amount: lIngredient.quantity})
        });

        return ingredientList
    }

}
