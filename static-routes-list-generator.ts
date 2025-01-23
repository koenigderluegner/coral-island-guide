import * as fs from "fs";
import * as path from "path";
import { CookingRecipe, ItemProcessing, NPC, OfferingAltar } from "./packages/data-types/src";

const routes: string[] = [];

const assetPath = path.join(__dirname, 'packages/guide/src/assets/live/database/en')

function getAsset<T>(fileName: string): T {
    return JSON.parse(fs.readFileSync(path.join(assetPath, fileName + '.json'), {encoding: "utf8"}));
}

function transformTabName(tabName: string): string {
    // @ts-ignore throws es2021 error despite being configured to es2021 or higher
    return tabName.toLowerCase().replaceAll(' ', '');
}

/** NPCs **/
const npcs = getAsset<NPC[]>('npcs').filter(npc => !npc.key.includes('?')); // remove ???? entry
routes.push(...npcs.map(npc => '/npcs/' + npc.key))

/** Crafting **/
const cookingRecipes = getAsset<Record<string, CookingRecipe[]>>('cooking-recipes') // remove ???? entry
routes.push(...Object.keys(cookingRecipes[0]).map(utensil => '/crafting/cooking/' + transformTabName(utensil)))
routes.push(...Object.keys(cookingRecipes[0]).map(utensil => '/my/cooking-recipes-checklist/' + transformTabName(utensil)))

const itemProcessing = getAsset<Record<string, ItemProcessing[]>>('item-processing');
routes.push(...Object.keys(itemProcessing[0]).map(utensil => '/crafting/artisan/' + transformTabName(utensil)))


/** Locations **/
const altars = getAsset<OfferingAltar[]>('offerings');
let altarPaths = altars.filter(r => r.offeringType !== 'Diving').map(altar => altar.urlPath);
routes.push(...altarPaths.map(utensil => '/locations/lake-temple/' + transformTabName(utensil)))
routes.push(...altarPaths.map(utensil => '/my/offerings-checklist/' + transformTabName(utensil)))


/** Journal **/
const produceTabs = ['Crops', 'Animal Products', 'Artisan Products', 'Ocean']
routes.push(...produceTabs.map(utensil => '/journal/produce/' + transformTabName(utensil)))

const caughtTabs = ['Fish', 'Insects', 'Sea Critters']
routes.push(...caughtTabs.map(utensil => '/journal/caught/' + transformTabName(utensil)))
routes.push(...caughtTabs.map(utensil => '/my/museum-checklist/' + transformTabName(utensil)))

const foundTabs = ['Artifacts', 'Gems', 'Fossils', 'Scavangables']
routes.push(...foundTabs.map(utensil => '/journal/found/' + transformTabName(utensil)))
routes.push(...foundTabs.slice(0, caughtTabs.length).map(utensil => '/my/museum-checklist/' + transformTabName(utensil)))

const notesTabs =  ['Letters', 'Torn pages', 'Treasure Map'];
routes.push(...notesTabs.map(utensil => '/journal/notes/' + transformTabName(utensil)))

let routeFile = path.join(__dirname, 'packages/guide/src/generated/routes.txt');
fs.writeFileSync(routeFile, routes.join('\n'), {flag: 'w'});

console.log('Saved routes to %s', routeFile)










