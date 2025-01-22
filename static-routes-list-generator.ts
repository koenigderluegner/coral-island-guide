import * as fs from "fs";
import * as path from "path";
import { CookingRecipe, ItemProcessing, NPC } from "./packages/data-types/src";

const routes: string[] = [];

const assetPath = path.join(__dirname, 'packages/guide/src/assets/live/database/en')

function getAsset<T>(fileName: string): T {
    return JSON.parse(fs.readFileSync(path.join(assetPath, fileName + '.json'), {encoding: "utf8"}));
}

const npcs = getAsset<NPC[]>('npcs').filter(npc => !npc.key.includes('?')); // remove ???? entry
routes.push(...npcs.map(npc => '/npcs/' + npc.key))

const cookingRecipes = getAsset<Record<string, CookingRecipe[]>>('cooking-recipes') // remove ???? entry
routes.push(...Object.keys(cookingRecipes[0]).map(utensil => '/crafting/cooking/' + transformTabName(utensil)))

const itemProcessing = getAsset<Record<string, ItemProcessing[]>>('item-processing') // remove ???? entry
routes.push(...Object.keys(itemProcessing[0]).map(utensil => '/crafting/artisan/' + transformTabName(utensil)))

let routeFile = path.join(__dirname, 'packages/guide/src/generated/routes.txt');
fs.writeFileSync(routeFile, routes.join('\n'), {flag: 'w'});

console.log('Saved routes to %s', routeFile)

function transformTabName(tabName: string): string {
    // @ts-ignore throws es2021 error despite being configured to es2021 or higher
    return tabName.toLowerCase().replaceAll(' ', '');
}








