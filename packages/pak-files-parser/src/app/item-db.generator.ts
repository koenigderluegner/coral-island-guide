import { InventoryItems } from '../types/inventory-items.type';
import { InventoryItemsEngineInterface } from '../interfaces/inventory-items-engine.interface';
import { readAsset } from '../util/functions';
import { InventoryItem } from '../interfaces/inventory-item.interface';

export class ItemDbGenerator {

    itemDb: InventoryItems[];
    itemEngineDataDb: InventoryItemsEngineInterface[];

    constructor() {
        // ProjectCoral Content Project Coral Core Data
        this.itemDb = readAsset<InventoryItems[]>('DT_InventoryItems.json');
        this.itemEngineDataDb = readAsset<InventoryItemsEngineInterface[]>('DA_InventoryItemsEngineData.json');

    }

    generate() {
        const map: Map<string, Record<any, any>> = new Map<string, Record<any, any>>();

        const qualityMap: Map<string, string> = new Map<string, string>([
            ['-a', 'bronze'],
            ['-b', 'silver'],
            ['-c', 'gold'],
            ['-d', 'osmium'],
        ]);
        Object.keys(this.itemDb[0]?.Rows).forEach(itemKey => {

            const dbItem: InventoryItem = this.itemDb[0]?.Rows[itemKey];

            if (itemKey.endsWith('-a') || itemKey.endsWith('-b') || itemKey.endsWith('-c') || itemKey.endsWith('-d')) {
                let qualities = map.get(itemKey.slice(0, -2))?.['qualities'];
                let quality = qualityMap.get(itemKey.slice(-2));
                if (qualities && quality)
                    qualities[quality] = {
                        price: dbItem.price,
                        sellPrice: dbItem.sellPrice,
                    };

                return;

            }

            const item: Record<any, any> = {
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
            };

            let engineData = this.itemEngineDataDb[0]?.Properties.dataMap[itemKey];
            if (engineData) {
                item['tags'] = engineData.tags ?? [];
                item['iconMeta'] = engineData.icon ?? null;
            }

            map.set(itemKey, item);


        });

        return map;
    }
}