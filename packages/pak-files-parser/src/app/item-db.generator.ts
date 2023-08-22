import { InventoryItems } from '../types/inventory-items.type';
import { InventoryItemsEngineInterface } from '../interfaces/inventory-items-engine.interface';
import { convertToIconName, getReferencedString, getSourceStringResult, readAsset } from '../util/functions';
import { InventoryItem } from '../interfaces/inventory-item.interface';
import { Item } from '@ci/data-types';
import { getQuality, removeQualityFlag } from "@ci/util";

export class ItemDbGenerator {

    itemDb: InventoryItems[];
    itemEngineDataDb: InventoryItemsEngineInterface[];

    constructor() {
        this.itemDb = readAsset<InventoryItems[]>('ProjectCoral/Content/ProjectCoral/Core/Data/DT_InventoryItems.json');
        this.itemEngineDataDb = readAsset<InventoryItemsEngineInterface[]>('ProjectCoral/Content/ProjectCoral/Core/Data/DA_InventoryItemsEngineData.json');

    }

    generate() {
        const map: Map<string, Item> = new Map<string, Item>();

        Object.keys(this.itemDb[0]?.Rows).forEach(itemKey => {

            if (itemKey === 'None') return;

            const dbItem: InventoryItem = this.itemDb[0]?.Rows[itemKey];

            if (itemKey.endsWith('-a') || itemKey.endsWith('-b') || itemKey.endsWith('-c') || itemKey.endsWith('-d')) {
                let qualities = map.get(removeQualityFlag(itemKey))?.['qualities'];
                let quality = getQuality(itemKey);
                if (qualities && quality)
                    qualities[quality] = {
                        price: dbItem.price,
                        sellPrice: dbItem.sellPrice,
                    };

                return;

            }

            const iconName = '';


            const item: Item = {
                id: itemKey,
                displayName: getSourceStringResult(dbItem.name),
                price: dbItem.price,
                sellPrice: dbItem.sellPrice,
                sellAt: dbItem.sellAt,
                stackable: dbItem.stackable,
                inventoryCategory: getSourceStringResult(dbItem.inventoryDisplayCategory),
                displayKey: dbItem.displayKey,
                description: dbItem.description.SourceString,
                qualities: {},
                iconName,
            };

            const dataMap = this.itemEngineDataDb[0]?.Properties.dataMap;
            let engineData;
            if (Array.isArray(dataMap)) {
                const offeringRewardsConfigEffectsMaps = dataMap.find(entry => Object.keys(entry).includes(itemKey));
                engineData = offeringRewardsConfigEffectsMaps?.[itemKey]
            } else {
                engineData = dataMap[itemKey]
            }

            if (engineData) {
                item.tags = engineData.tags ?? [];

                const objectName = engineData.icon?.ObjectName;
                if (!!objectName) {
                    item.iconName = convertToIconName(getReferencedString(objectName)).replace('.png', '');
                }

            }
            map.set(itemKey, item);


        });

        return map;
    }


}
