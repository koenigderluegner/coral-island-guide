import { BaseGenerator } from "./base-generator.class";
import { Item, ItemProcessShopData } from "@ci/data-types";
import { Datatable } from "../../interfaces/datatable.interface";
import { minifyItem, readAsset } from "../../util/functions";
import { RawItemProcessShopData } from "../../interfaces/raw-data-interfaces/raw-item-process-shop-data.interface";
import { Logger } from "../../util/logger.class";

export class ItemProcessShopGenerator extends BaseGenerator<RawItemProcessShopData, ItemProcessShopData> {

    datatable: Datatable<RawItemProcessShopData>[];

    constructor(protected itemMap: Map<string, Item>, datatablePath: string) {
        super();
        this.datatable = readAsset<Datatable<RawItemProcessShopData>[]>(datatablePath);
    }

    handleEntry(itemKey: string, dbItem: RawItemProcessShopData): ItemProcessShopData | undefined {

        const input = this.itemMap.get(dbItem.input.item.itemID)


        if (!input) {
            console.log('Cant find input item for shop processor', itemKey);
            return;
        }


        const outputChancesSum = dbItem.outputChance.reduce((a, b) => a + b.chance, 0);
        if (Math.abs(outputChancesSum - 100) > 1.5){
            Logger.warn(`Percentage sum for ${input.displayName} (${input.id}) deviates more than 1.5%:`, outputChancesSum)
        }
        return {
            input: minifyItem(input),
            inputAmount: dbItem.input.amount,
            processingCost: dbItem.gold,
            outputChanges: dbItem.outputChance.map(outputChance => {
                const outputItem = this.itemMap.get(outputChance.item.item.itemID);

                if (!outputItem) throw new Error('Cant find item for output chance: ' + outputChance.item.item.itemID);

                return {
                    item: minifyItem(outputItem),
                    amount: outputChance.item.amount,
                    chance: outputChance.chance
                }
            })
        };
    }

}
