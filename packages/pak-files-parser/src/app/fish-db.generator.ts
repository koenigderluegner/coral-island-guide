import { addSpacesToPascalCase, getEnumValue, } from '@ci/util';
import { Fish, FishSpawnSettings, Item } from '@ci/data-types';
import { Fishs } from '../types/fishs.type';
import { RawFish } from '../interfaces/raw-data-interfaces/raw-fish.interface';
import { readAsset } from '../util/functions';
import { Datatable } from "../interfaces/datatable.interface";
import { RawFishingMinigame } from "../interfaces/raw-data-interfaces/raw-fishing-minigame.interface";

export class FishDbGenerator {

    critterDb: Fishs[];
    minigame: Datatable<RawFishingMinigame>[];

    constructor(protected itemMap: Map<string, Item>) {
        this.critterDb = readAsset<Fishs[]>('ProjectCoral/Content/ProjectCoral/Data/Fish/DT_Fish.json');
        this.minigame = readAsset<Datatable<RawFishingMinigame>[]>('ProjectCoral/Content/ProjectCoral/Data/Fish/DT_FishMinigame.json');

    }

    generate(): Map<string, Fish> {
        const map: Map<string, Fish> = new Map<string, Fish>();

        const critterRows = this.critterDb[0]?.Rows;
        const minigameRows = this.minigame[0]?.Rows;
        Object.keys(critterRows).forEach(itemKey => {

            const dbItem: RawFish = critterRows?.[itemKey];

            const item: Item | undefined = this.itemMap.get(dbItem.FishSKU.itemID);

            const minigame = minigameRows[itemKey];

            if (item) {
                const spawnSettings: FishSpawnSettings = {
                    key: itemKey,
                    spawnArea: {
                        canBeCatchOnCave: dbItem.SpawnArea.CanBeCatchOnCave,
                        canBeCatchOnLake: dbItem.SpawnArea.CanBeCatchOnLake,
                        canBeCatchOnOcean: dbItem.SpawnArea.CanBeCatchOnOcean,
                        canBeCatchOnPond: dbItem.SpawnArea.CanBeCatchOnPond,
                        canBeCatchOnRiver: dbItem.SpawnArea.CanBeCatchOnRiver,
                    },
                    spawnLocation: dbItem.SpawnLocation.map(getEnumValue).map(addSpacesToPascalCase),
                    spawnTime: {
                        morning: dbItem.SpawnTime.Morning,
                        afternoon: dbItem.SpawnTime.Afternoon,
                        evening: dbItem.SpawnTime.Evening,
                        night: dbItem.SpawnTime.Night
                    },
                    spawnWeather: {
                        sunny: dbItem.SpawnWeather.Sunny,
                        rain: dbItem.SpawnWeather.Rain,
                        snow: dbItem.SpawnWeather.Snow,
                        blizzard: dbItem.SpawnWeather.Blizzard,
                        windy: dbItem.SpawnWeather.Windy,
                        storm: dbItem.SpawnWeather.Storm,
                    },
                    spawnSeason: {
                        spring: dbItem.SpawnSeason.Spring,
                        summer: dbItem.SpawnSeason.Summer,
                        fall: dbItem.SpawnSeason.Fall,
                        winter: dbItem.SpawnSeason.Winter,
                    },
                    isUsingSpecificDate: dbItem.isUsingSpecificDate,
                    dateRangeList: dbItem.dateRangeList.map(dr => {
                        return {
                            isValidOnSpecificDate: dr.isValidOnSpecificDate,
                            isValidIndefinitelyOnceStarted: dr.isValidIndefinitelyOnceStarted,
                            random: dr.random,
                            lastsTill: {
                                day: dr.lastsTill.day,
                                season: getEnumValue(dr.lastsTill.season),
                                year: dr.lastsTill.year,
                            },
                            startsFrom: {
                                day: dr.startsFrom.day,
                                season: getEnumValue(dr.startsFrom.season),
                                year: dr.startsFrom.year,
                            },
                        };
                    }),
                };

                const existingFish = [...map.values()].find(f => f.item.id === item.id);

                if (existingFish) {
                    existingFish.spawnSettings.push(spawnSettings);
                    return;
                }


                const fish: Fish = {
                    key: itemKey,
                    isEnabled: dbItem.isEnabled,
                    fishName: dbItem.FishName,
                    fishSize: getEnumValue(dbItem.fishSize),
                    rarity: getEnumValue(dbItem.Rarity),
                    minCaughtSize: dbItem.minCaughtSize,
                    maxCaughtSize: dbItem.maxCaughtSize,
                    experienceGrantedWhenCaught: dbItem.experienceGrantedWhenCaught,
                    spawnSettings: [spawnSettings],
                    pattern: getEnumValue(minigame.fishPattern),
                    difficulty: getEnumValue(minigame.fishDifficultyCategory),
                    item
                };

                map.set(fish.key, fish);
            }


        });

        return map;
    }
}
