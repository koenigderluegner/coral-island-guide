import { Season } from "@ci/data-types";

export const rarityMap: Map<string, number> = new Map<string, number>([
    ['Common', 10],
    ['Uncommon', 20],
    ['Rare', 30],
    ['Super Rare', 40],
    ['SuperRare', 40],
    ['Legendary', 50],
]);

export const critterSizeMap: Map<string, number> = new Map<string, number>([
    ['Small', 10],
    ['Medium', 20],
    ['Large', 30],
    ['Gigantic', 40],
]);

export const seasonMap: Map<Season, number> = new Map<Season, number>([
    ['Spring', 1],
    ['Summer', 2],
    ['Fall', 3],
    ['Winter', 4],
]);
