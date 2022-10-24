import * as fs from 'fs';
import * as path from 'path';
import { InventoryItemsInterface } from './interfaces/inventory-items.interface';
import { InventoryItem } from './interfaces/inventory-item.interface';
import { InventoryItemsEngineInterface } from './interfaces/inventory-items-engine.interface';


function readAsset<T = any>(fileName: string): T {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'assets', fileName), {encoding: 'utf8', flag: 'r'}));
}

function generateJson(fileName: string, jsonContent: any) {

    const generatedDirPAth = path.join(__dirname, 'generated');

    if (!fs.existsSync(path.join(__dirname, 'generated')))
        fs.mkdirSync(generatedDirPAth, {recursive: true});


    fs.writeFileSync(path.join(generatedDirPAth, fileName), JSON.stringify(jsonContent, null, 4), {
        encoding: 'utf8',
        flag: 'w+'
    });
}

// ProjectCoral Content Project Coral Core Data
const itemDb = readAsset<InventoryItemsInterface[]>('DT_InventoryItems.json');
const itemEngineDataDb = readAsset<InventoryItemsEngineInterface[]>('DA_InventoryItemsEngineData.json');

const map: Map<string, Record<any, any>> = new Map<string, Record<any, any>>();

const qualityMap: Map<string, string> = new Map<string, string>([
    ['-a', 'bronze'],
    ['-b', 'silver'],
    ['-c', 'gold'],
    ['-d', 'osmium'],
]);
Object.keys(itemDb[0]?.Rows).forEach(itemKey => {

    const dbItem: InventoryItem = itemDb[0]?.Rows[itemKey];

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

    let engineData = itemEngineDataDb[0]?.Properties.dataMap[itemKey];
    if (engineData) {
        item['tags'] = engineData.tags ?? [];
        item['iconMeta'] = engineData.icon ?? null;
    }

    map.set(itemKey, item);


});

generateJson('items.json', [...map.values()]);

