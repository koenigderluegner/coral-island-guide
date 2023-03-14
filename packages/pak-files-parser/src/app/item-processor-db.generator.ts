import glob from 'glob';
import path from 'path';
import { Datatable } from '../interfaces/datatable.interface';
import fs from 'fs';
import { RawItemProcessing } from '../interfaces/raw-item-processing.interface';
import { Item, ItemProcessing } from '@ci/data-types';
import { minifyItem } from '../util/functions';

export class ItemProcessorDbGenerator {

    datatables: Record<string, Datatable<RawItemProcessing>[]> = {};


    constructor(protected itemMap: Map<string, Item>) {
    }

    generate(): Map<string, Record<string, ItemProcessing[]>> {
                // Content ProjectCoral Data ItempProcessing
        const itemProcessingDir = path.join(__dirname, 'assets', 'ProjectCoral/Content/ProjectCoral/Data', 'ItemProcessing',);
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

                const inputItem = minifyItem(this.itemMap.get(this.removeQualityFlag(dbItem.input.item.itemID))!);
                const outputItem = minifyItem(this.itemMap.get(this.removeQualityFlag(dbItem.output.itemID))!);

                const exisitingItem = recipes.find(recipe => recipe.output.item.id === outputItem.id);


                let newRecipe: ItemProcessing = {
                    useCategory: dbItem.useCategory,
                    day: dbItem.day,
                    time: dbItem.time,
                    additionalInput: dbItem.additionalInput.map(ai => {
                        const item = this.itemMap.get(this.removeQualityFlag(ai.item.itemID))!;

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
                    } : null

                };

                if (exisitingItem && JSON.stringify(exisitingItem) === JSON.stringify(newRecipe)) {
                    return;
                }


                recipes.push(newRecipe);


            });

            rec[machineName] = recipes;
        });

        res.set('unused', rec);

        return res;


    }

    removeQualityFlag(itemKey: string): string {
        if (itemKey.endsWith('-a') || itemKey.endsWith('-b') || itemKey.endsWith('-c') || itemKey.endsWith('-d')) {
            return itemKey.slice(0, -2);
        }
        return itemKey;
    }

}
