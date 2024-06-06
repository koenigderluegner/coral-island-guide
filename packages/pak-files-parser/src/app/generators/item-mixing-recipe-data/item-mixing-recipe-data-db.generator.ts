import { CookingRecipe, Item, ItemMixingRecipeData, MinimalItem, TagBasedItem } from "@ci/data-types";
import { minifyItem, readAsset } from "../../../util/functions";
import { CookingIngredients } from "../../../interfaces/raw-data-interfaces/raw-cooking-recipe.interface";
import { removeQualityFlag } from "@ci/util";
import { StringTable } from "../../../util/string-table.class";
import { BaseGenerator } from "../_base/base-generator.class";
import { RawItemMixingRecipeData } from "./raw-item-mixing-recipe-data.type";
import { Datatable } from "../../../interfaces/datatable.interface";

export class ItemMixingRecipeDataDbGenerator extends BaseGenerator<RawItemMixingRecipeData, ItemMixingRecipeData> {

    datatable: Datatable<RawItemMixingRecipeData>[];

    constructor(
        protected assetPath: string,
        protected itemMap: Map<string, Item>,
        protected tagBasedItemMap: Map<string, TagBasedItem>
    ) {
        super();
        this.datatable = readAsset(assetPath);
    }

    handleEntry(itemKey: string, dbItem: RawItemMixingRecipeData): ItemMixingRecipeData | undefined {

        if (itemKey === 'None') return;

        let additionsToGenerics: Record<string, MinimalItem[]> | undefined = undefined;

        const ingredients: CookingRecipe["ingredients"] = [];
        const eitherOrIngredients: CookingRecipe["eitherOrIngredients"] = [];

        const genericIngredients = dbItem.genericIngredients.map(genericIngredient => {
            let foundGenericItem: TagBasedItem | undefined = this.tagBasedItemMap.get(genericIngredient.genericItem.RowName);
            let genericItem: Omit<TagBasedItem, 'items'> & { items?: MinimalItem[] } | undefined = undefined;
            if (foundGenericItem) {
                genericItem = {...foundGenericItem as TagBasedItem}
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

        const item = this.itemMap.get(dbItem.result.itemID);

        if (!item) {
            console.log('Missing item for item mixing recipe!', itemKey)
            return;
        }

        return {
            key: itemKey,
            amount: 1, // currently always 1
            cookingKey: itemKey,
            item: minifyItem(item),
            genericIngredients,
            ingredients,
            eitherOrIngredients,
            additionsToGenerics

        }
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


        const itemKeys = [...new Set(ingredient.listIngredients.map(l => removeQualityFlag(l.itemData.itemID)))];


        const isPossiblyGenericItem = itemKeys.length > 1;

        if (isPossiblyGenericItem) {
            ingredient.listIngredients.forEach(lIngredient => {
                const item = this.itemMap.get(removeQualityFlag(lIngredient.itemData.itemID));

                const hasTagFromGeneric = item?.tags?.some(tag => genericTags.includes(tag));
                const alreadyInList = ingredientList.find(ingredient => ingredient.item?.id === item?.id);

                const isItemViableForList = item && !alreadyInList && !hasTagFromGeneric;
                if (isItemViableForList)
                    ingredientList.push({item: (item), amount: lIngredient.quantity})
            });
        } else {
            const item = this.itemMap.get(itemKeys[0]);
            if (item)
                ingredientList.push({item: (item), amount: ingredient.listIngredients[0].quantity})
        }

        return ingredientList
    }

}
