import { Critter } from '../../../data-types/src/lib/interfaces/critter.interface';
import { addSpacesToPascalCase, copyAssetsForFiles, getTruthyValues } from './functions';
import { Item } from '@ci/data-types';
import { Fish } from '../../../data-types/src/lib/interfaces/fish.interface';

export function printCritter(critter: Critter[]): void {

    critter.forEach((critter: Critter) => {
        console.log(`|{{Icon|${critter.item.displayName}|75}}`);
        console.log(`|[[${critter.item.displayName}]]`);
        console.log(`|${getQualityPrices(critter.item.sellPrice, critter.item.qualities)}`);
        console.log(`|`);
        console.log(`|-`);
        if (critter.item.iconName)
            copyAssetsForFiles([critter.item.iconName]);

    });

}

export function printFish(critter: Fish[]): void {


    // {| class="fandom-table sortable" style="text-align:center;"
    //     |-
    //         !Name
    //     !Base Price
    //     !Location
    //     !Time
    //     !Weather
    //     !Season
    //     !Rarity
    //     |-


    critter.forEach((critter: Fish) => {


        console.log(`|{{I|${critter.item.displayName}}}`); // Name
        console.log(`|${critter.item.sellPrice}{{G}}`); // Base Price
        console.log(`|${critter.spawnLocation.map(addSpacesToPascalCase).join(', ')}`); // Locations
        console.log(`|${getTruthyValues(critter.spawnTime)}`); // Time
        console.log(`|${getTruthyValues(critter.spawnWeather)}`); // Weather
        console.log(`|${getTruthyValues(critter.spawnSeason)}`); // Season
        console.log(`|${critter.rarity}`); // Rarity
        console.log(`|-`); // end row
        if (critter.item.iconName)
            copyAssetsForFiles([critter.item.iconName]);

    });

}


export function getQualityPrices(basePrice: number, qualities: Item['qualities']): string {
    return `{{Quality price|${basePrice}|bro=${qualities.bronze?.sellPrice}|sil=${qualities.silver?.sellPrice}|gol=${qualities.gold?.sellPrice}|osm=${qualities.osmium?.sellPrice}}}`;
}
