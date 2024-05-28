import glob from 'glob';
import path from 'path';
import { Datatable } from '../../../interfaces/datatable.interface';
import fs from 'fs';
import { RawItemProcessing } from '../../../interfaces/raw-data-interfaces/raw-item-processing.interface';
import { Item, ItemProcessing } from '@ci/data-types';
import { minifyItem } from '../../../util/functions';
import { getQuality, removeQualityFlag } from "@ci/util";
import { environment } from "../../../environments/environment";

export class ItemProcessorDbGenerator {

    datatables: Record<string, Datatable<RawItemProcessing>[]> = {};


    constructor(protected itemMap: Map<string, Item>) {
    }

    generate(): Map<string, Record<string, ItemProcessing[]>> {

        const itemProcessingDir = path.join(environment.assetPath, 'ProjectCoral/Content/ProjectCoral/Data', 'ItemProcessing',);
        const res: Map<string, Record<string, ItemProcessing[]>> = new Map<string, Record<string, ItemProcessing[]>>();

        const rec: Record<string, ItemProcessing[]> = {};

        const datatables: string[] = glob.sync('*.json', {cwd: itemProcessingDir});

        datatables.forEach(fileName => {
            const regex = /DT_(?:Kelp)?(.*)Recipe.json/m;
            const subst = `$1`;

            this.datatables[fileName.replace(regex, subst)] = JSON.parse(fs.readFileSync(path.join(itemProcessingDir, fileName), {
                encoding: 'utf8',
                flag: 'r'
            }));
        });

        let strings = Object.keys(this.datatables);

        strings.forEach(machineName => {
            const recipes: ItemProcessing[] = [];

            Object.keys(this.datatables[machineName][0].Rows).forEach(pseudoItemKey => {

                const dbItem: RawItemProcessing | undefined = this.datatables[machineName][0].Rows[pseudoItemKey];

                if (dbItem.input.item.itemID === 'None') return;

                const inputItem = minifyItem(this.itemMap.get(removeQualityFlag(dbItem.input.item.itemID))!);
                const outputItem = minifyItem(this.itemMap.get(removeQualityFlag(dbItem.output.itemID))!);

                const exisitingItems = recipes.filter(recipe => recipe.output.item.id === outputItem.id);
                const exisitingItem = exisitingItems.length === 1 ? exisitingItems[0] : exisitingItems.find(recipe => recipe.input.item.id === inputItem.id)


                let newRecipe: ItemProcessing = {
                    useCategory: dbItem.useCategory,
                    day: dbItem.day,
                    time: dbItem.time,
                    additionalInput: dbItem.additionalInput.map(ai => {
                        const item = this.itemMap.get(removeQualityFlag(ai.item.itemID))!;

                        return {
                            amount: ai.amount,
                            item: minifyItem(item)
                        };
                    }),
                    input: {
                        amount: dbItem.input.amount,
                        item: inputItem
                    },
                    output: {
                        amount: dbItem.amount,
                        item: outputItem
                    },
                    genericInput: dbItem.useGenericRequirement ? {
                        amount: dbItem.genericInput.amount,
                        key: dbItem.genericInput.genericItem.RowName,
                    } : null,
                };

                if (exisitingItem) {

                    let {qualities, ...qualitylessExistingItem} = exisitingItem;
                    let {qualities: _, ...qualitylessNewItem} = newRecipe;

                    if (JSON.stringify(qualitylessExistingItem) === JSON.stringify(qualitylessNewItem))
                        return;

                    const inputQuality = getQuality(dbItem.input.item.itemID);
                    const outputQuality = getQuality(dbItem.output.itemID);
                    const inputQualityMatchesOutputQuality = inputQuality === outputQuality;

                    const genericInputMatches = JSON.stringify(exisitingItem.genericInput) === JSON.stringify(newRecipe.genericInput)

                    const isProcessingTimeMismatching = newRecipe.day !== exisitingItem.day || newRecipe.time.hours !== exisitingItem.time.hours || newRecipe.time.minutes !== exisitingItem.time.minutes;

                    if (isProcessingTimeMismatching && inputQualityMatchesOutputQuality && genericInputMatches && inputItem.id === outputItem.id) {

                        if (exisitingItem.qualities === undefined) {
                            exisitingItem.qualities = {}
                        }

                        exisitingItem.qualities[outputQuality] = {
                            day: newRecipe.day,
                            time: newRecipe.time
                        };
                        return
                    }

                    if (!inputQualityMatchesOutputQuality && inputItem.id === outputItem.id) {

                        if (!Array.isArray(exisitingItem.refinements)) {
                            exisitingItem.refinements = []
                        }

                        exisitingItem.refinements.push({
                            from: inputQuality,
                            to: outputQuality,
                            day: newRecipe.day,
                            time: newRecipe.time
                        })

                        return;

                    }

                }

                recipes.push(newRecipe);

            });

            rec[machineName] = recipes;
        });

        res.set('unused', rec);

        return res;


    }


}
