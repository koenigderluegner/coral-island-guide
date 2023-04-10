import { InventoryItems } from '../types/inventory-items.type';
import { InventoryItemsEngineInterface } from '../interfaces/inventory-items-engine.interface';
import { convertToIconName, readAsset } from '../util/functions';
import { InventoryItem } from '../interfaces/inventory-item.interface';
import { Item } from '@ci/data-types';
import { getQuality, removeQualityFlag } from "@ci/util";

export class ItemDbGenerator {

    itemDb: InventoryItems[];
    itemEngineDataDb: InventoryItemsEngineInterface[];

    constructor() {
        // ProjectCoral Content Project Coral Core Data
        this.itemDb = readAsset<InventoryItems[]>('DT_InventoryItems.json');
        this.itemEngineDataDb = readAsset<InventoryItemsEngineInterface[]>('DA_InventoryItemsEngineData.json');

    }

    generate() {
        const map: Map<string, Item> = new Map<string, Item>();

        Object.keys(this.itemDb[0]?.Rows).forEach(itemKey => {

            if (itemKey === 'None') return;

            const dbItem: InventoryItem = this.itemDb[0]?.Rows[itemKey];

            if (this._isBlacklisted(itemKey, dbItem)) return;

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
                displayName: dbItem.name.SourceString,
                price: dbItem.price,
                sellPrice: dbItem.sellPrice,
                sellAt: dbItem.sellAt,
                stackable: dbItem.stackable,
                inventoryCategory: dbItem.inventoryDisplayCategory.SourceString,
                displayKey: dbItem.displayKey,
                description: dbItem.description.SourceString,
                qualities: {},
                iconName,
            };

            let engineData = this.itemEngineDataDb[0]?.Properties.dataMap[itemKey];
            if (engineData) {
                item.tags = engineData.tags ?? [];
                item.iconMeta = engineData.icon ?? null;

                item.iconName = convertToIconName(item.iconMeta?.ObjectName.split(' ')[1]);
            }
            map.set(itemKey, item);


        });

        return map;
    }

    private _isBlacklisted(key: string, dbItem: InventoryItem): boolean {

        if (!dbItem.name.SourceString) return true;

        const moveOrders = [
            'item_110024',
            'item_110025',
            'item_110026',
            'item_110027',
            'item_110028',
            'item_110029',
            'item_110030',
            'item_110031',
            'item_110032',
            'item_110033',
            'item_110034',
            'item_110035',
            'item_110036',
            'item_110037',
        ];

        return moveOrders.includes(key);


    }
}
