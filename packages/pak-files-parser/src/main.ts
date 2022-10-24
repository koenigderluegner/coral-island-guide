import { InventoryItems } from './types/inventory-items.type';
import { generateJson, readAsset } from './util/functions';
import { ItemDbGenerator } from './app/item-db.generator';

const recipesDB = readAsset<InventoryItems[]>('DT_CraftingRecipes.json');


const itemDbGenerator = new ItemDbGenerator();
const itemDbMap = itemDbGenerator.generate();


generateJson('items.json', [...itemDbMap.values()]);

