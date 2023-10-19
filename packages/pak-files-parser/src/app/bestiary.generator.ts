import { BaseGenerator } from "./base-generator.class";
import { RawBestiary } from "../interfaces/raw-data-interfaces/raw-bestiary.interface";
import { ChancePerItem, Enemy, Item } from "@ci/data-types";
import { Datatable } from "../interfaces/datatable.interface";
import { AssetPathNameToIcon, minifyItem, readAsset } from "../util/functions";
import { RawEnemyData } from "../interfaces/raw-data-interfaces/raw-enemy-data.interface";
import { StringTable } from "../util/string-table.class";
import { Logger } from "../util/logger.class";
import { nonNullable } from "@ci/util";

export class BestiaryGenerator extends BaseGenerator<RawBestiary, Enemy> {
    datatable: Datatable<RawBestiary>[] = readAsset(`ProjectCoral/Content/ProjectCoral/Data/Journal/Bestiary/DT_JournalBestiaryData.json`);
    enemies: Record<string, RawEnemyData>

    constructor(protected itemMap: Map<string, Item>) {
        super();
        this.enemies = readAsset<Datatable<RawEnemyData>[]>(`ProjectCoral/Content/ProjectCoral/Enemies/DT_Enemies.json`)[0].Rows;

    }

    handleEntry(itemKey: string, dbItem: RawBestiary): Enemy | undefined {

        const description = StringTable.getString(dbItem.enemyDesc);
        const enemy = this.enemies[dbItem.enemyDataRow.RowName];

        if (!enemy) {
            Logger.error(`Cant find enemy data for ${itemKey}`);
            return;
        }


        return {
            key: itemKey,
            displayName: StringTable.getString(dbItem.enemyName) ?? '',
            description: description === 'Unknown' ? null : description,
            experience: enemy.experiencePoint,
            iconName: AssetPathNameToIcon(dbItem.icon.AssetPathName),
            image: dbItem.image.AssetPathName === 'None' ? null : AssetPathNameToIcon(dbItem.image.AssetPathName),
            dropRates: enemy.possibleEnemiesDrops
                .map(rates => {

                    const foundItem = this.itemMap.get(rates.dropItem.itemID);

                    if (!foundItem) {
                        Logger.error(`Cant find item ${rates.dropItem.itemID} while looping drop rates for ${itemKey}`)
                        return;
                    }

                    return {
                        item: minifyItem(foundItem),
                        amount: 1,
                        chance: rates.dropChance * 100
                    } satisfies ChancePerItem
                })
                .filter(nonNullable)
        };
    }

}
