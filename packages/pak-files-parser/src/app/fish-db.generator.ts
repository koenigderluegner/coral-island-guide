import { addSpacesToPascalCase, getEnumValue, } from '@ci/util';
import { Fish, Item } from '@ci/data-types';
import { Fishs } from '../types/fishs.type';
import { RawFish } from '../interfaces/raw-fish.interface';
import { readAsset } from '../util/functions';

export class FishDbGenerator {

    critterDb: Fishs[];

    constructor(protected itemMap: Map<string, Item>) {
        this.critterDb = readAsset<Fishs[]>('ProjectCoral/Content/ProjectCoral/Data/Fish/DT_Fish.json');

    }

    generate(): Map<string, Fish> {
        const map: Map<string, Fish> = new Map<string, Fish>();

        Object.keys(this.critterDb[0]?.Rows).forEach(itemKey => {

            const dbItem: RawFish = this.critterDb[0]?.Rows[itemKey];

            const item: Item | undefined = this.itemMap.get(dbItem.FishSKU.itemID);

            if (item) {
                const fish: Fish = {
                    key: itemKey,
                    isEnabled: dbItem.isEnabled,
                    fishName: dbItem.FishName,
                    fishSize: getEnumValue(dbItem.fishSize),
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
                    rarity: getEnumValue(dbItem.Rarity),
                    minCaughtSize: dbItem.minCaughtSize,
                    maxCaughtSize: dbItem.maxCaughtSize,
                    experienceGrantedWhenCaught: dbItem.experienceGrantedWhenCaught,
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
                    item
                };

                map.set(fish.key, fish);
            }


        });

        return map;
    }
}
