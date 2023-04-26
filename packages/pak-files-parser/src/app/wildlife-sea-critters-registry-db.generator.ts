import { BaseGenerator } from "./base-generator.class";
import { RawWildlifeSeaCrittersRegistry } from "../interfaces/raw-wildlife-sea-critters-registry.interface";
import { WildlifeSeaCrittersRegistry } from "../interfaces/wildlife-sea-critters-registry.interface";
import { Datatable } from "../interfaces/datatable.interface";
import { readAsset } from "../util/functions";
import { addSpacesToPascalCase, getEnumValue } from "@ci/util";
import { GridZonesDbGenerator } from "./grid-zones-db.generator";

export class WildlifeSeaCrittersRegistryDbGenerator extends BaseGenerator<RawWildlifeSeaCrittersRegistry, WildlifeSeaCrittersRegistry> {

    datatable: Datatable<RawWildlifeSeaCrittersRegistry>[];
    private _gridZones: Map<string, string>;

    constructor(registryPath: string, gridZonesPath: string) {
        super();
        this.datatable = readAsset<Datatable<RawWildlifeSeaCrittersRegistry>[]>(registryPath);
        this._gridZones = new GridZonesDbGenerator(gridZonesPath).generate()

    }

    handleEntry(itemKey: string, dbItem: RawWildlifeSeaCrittersRegistry): WildlifeSeaCrittersRegistry | undefined {

        const spawnAmountConditionModifier: [string, number][] = []
        const seasons = dbItem.conditions.seasons.map(getEnumValue).map(s => s.toLocaleLowerCase());
        const weather = dbItem.conditions.weather.map(getEnumValue).map(s => s.toLocaleLowerCase());
        const locations = dbItem.conditions.zones
            .map(zone => this._gridZones.get(zone.RowName))
            .filter(<T>(n?: T): n is T => Boolean(n))
            .map(zone => zone?.replace('_', ' '))
            .map(addSpacesToPascalCase)

        const spawnAmountConditionModifierKeys = Object.keys(dbItem.spawnOptions.spawnAmountConditionModifier);

        if (spawnAmountConditionModifierKeys.length) {
            spawnAmountConditionModifierKeys.forEach(spawnAmountConditionModifierKey => {
                const modifier = spawnAmountConditionModifierKey.split('_').pop()?.toLocaleLowerCase();
                // TODO find more cases
                if (modifier === 'raintoday') {
                    spawnAmountConditionModifier.push(['Rain', dbItem.spawnOptions.spawnAmountConditionModifier[spawnAmountConditionModifierKey]])
                } else {
                    console.log('unkknown spawn modification:', spawnAmountConditionModifierKey, itemKey)
                }
            })
        }

        return {
            type: 'ObjectName' in dbItem.type ? dbItem.type.ObjectName : dbItem.type.AssetPathName,
            spawnSeason: {
                spring: seasons.includes('spring'),
                summer: seasons.includes('summer'),
                fall: seasons.includes('fall'),
                winter: seasons.includes('winter'),
            },
            spawnWeather: {
                sunny: weather.includes('sunny'),
                snow: weather.includes('snow'),
                rain: weather.includes('rain'),
                storm: weather.includes('storm'),
                windy: weather.includes('windy'),
                blizzard: weather.includes('blizzard'),
            },
            spawnLocation: [...new Set(locations)],
            spawnTime: {
                morning: dbItem.conditions.dayTimeAllowed,
                afternoon: dbItem.conditions.dayTimeAllowed,
                evening: dbItem.conditions.nightTimeAllowed,
                night: dbItem.conditions.nightTimeAllowed,

            },
            spawnAmountModifiers: spawnAmountConditionModifier.length ? spawnAmountConditionModifier : undefined
        }
    }
}
