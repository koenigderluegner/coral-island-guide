import * as fs from 'fs';
import * as path from 'path';


function readAsset<T = any>(fileName: string): T {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'assets', fileName), {encoding: 'utf8', flag: 'r'}));
}

const itemDb = readAsset('DT_InventoryItems.json');


console.log(JSON.stringify(itemDb, null, 4));

