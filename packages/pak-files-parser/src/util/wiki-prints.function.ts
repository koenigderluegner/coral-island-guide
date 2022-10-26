import { Critter, Fish, Item } from '@ci/data-types';
import { addSpacesToPascalCase, getEnumValue, getTruthyValues } from '@ci/util';
import { copyAssetsForFiles } from './functions';

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


    console.log(`{| class="fandom-table sortable" style="text-align:center;"`);
    console.log(`|-`);
    console.log(`!Name`);
    console.log(`!Base Price`);
    console.log(`!Location`);
    console.log(`!Time`);
    console.log(`!Weather`);
    console.log(`!Season`);
    console.log(`!Rarity`);
    console.log(`!Size`);
    console.log(`|-`);

    critter.forEach((critter: Fish) => {

        let seasonString = `${getTruthyValues(critter.spawnSeason)}`;

        if (critter.isUsingSpecificDate) {
            seasonString = critter.dateRangeList.map(range => {
                return `From ${getEnumValue(range.startsFrom.season)} ${range.startsFrom.day} to ${getEnumValue(range.lastsTill.season)} ${range.lastsTill.day}`;
            }).join(', ');

        }


        console.log(`|{{I|${critter.item.displayName}}}`); // Name
        console.log(`|${critter.item.sellPrice} {{G}}`); // Base Price
        console.log(`|${critter.spawnLocation.map(addSpacesToPascalCase).join(', ')}`); // Locations
        console.log(`|${getTruthyValues(critter.spawnTime)}`); // Time
        console.log(`|${getTruthyValues(critter.spawnWeather)}`); // Weather
        console.log(`|${seasonString}`); // Season
        console.log(`|${addSpacesToPascalCase(critter.rarity)}`); // Rarity
        console.log(`|${critter.fishSize}`); // Rarity
        console.log(`|-`); // end row
        if (critter.item.iconName)
            copyAssetsForFiles([critter.item.iconName]);

    });

}


export function getQualityPrices(basePrice: number, qualities: Item['qualities']): string {
    return `{{Quality price|${basePrice}|bro=${qualities.bronze?.sellPrice}|sil=${qualities.silver?.sellPrice}|gol=${qualities.gold?.sellPrice}|osm=${qualities.osmium?.sellPrice}}}`;
}
