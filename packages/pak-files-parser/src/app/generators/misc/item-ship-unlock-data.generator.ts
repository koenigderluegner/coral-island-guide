import { BaseGenerator } from "../_base/base-generator.class";
import { Item, ShipToUnlockRequirement } from "@ci/data-types";
import { Datatable } from "../../../interfaces/datatable.interface";
import { minifyItem, readAsset } from "../../../util/functions";
import { RawShipToUnlockData } from "../../../interfaces/raw-data-interfaces/raw-ship-to-unlock-data.interface";
import { Logger } from "../../../util/logger.class";
import { nonNullable } from "@ci/util";

export class ItemShipUnlockDataGenerator extends BaseGenerator<RawShipToUnlockData, {
    itemId: string,
    value: ShipToUnlockRequirement
}> {
    datatable: Datatable<RawShipToUnlockData>[];

    constructor(protected itemMap: Map<string, Item>, protected path: string) {
        super();
        this.datatable = readAsset(path);
    }

    handleEntry(itemKey: string, dbItem: RawShipToUnlockData): {
        itemId: string,
        value: ShipToUnlockRequirement
    } | undefined {

        return {
            itemId: dbItem.item.itemID, value: {
                type: "ShipToUnlock",
                meta: {
                    includeAllQualities: dbItem.includeAllItemQuality,
                    itemsToShip: dbItem.shipItemList.map(si => {

                        const item = this.itemMap.get(si.itemID)

                        if (!item) {
                            Logger.error(`Cannot find item ${si.itemID} when trying to map unlock for ship!`);
                            return
                        }

                        return minifyItem(item)
                    }).filter(nonNullable)
                }
            }
        };
    }

}
