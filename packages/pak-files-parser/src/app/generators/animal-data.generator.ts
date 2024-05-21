import { BaseGenerator } from "./base-generator.class";
import { AnimalData, Item } from "@ci/data-types";
import { Datatable } from "../../interfaces/datatable.interface";
import { AssetPathNameToIcon, minifyItem, readAsset } from "../../util/functions";
import { getEnumValue, nonNullable } from "@ci/util";
import { RawAnimal } from "../../interfaces/raw-data-interfaces/raw-animal.interface";
import { RawAnimalIcons } from "../../interfaces/raw-data-interfaces/da-file-parse/raw-animal-icons.interface";

export class AnimalDataGenerator extends BaseGenerator<RawAnimal, AnimalData> {
    datatable: Datatable<RawAnimal>[] = readAsset(`ProjectCoral/Content/ProjectCoral/Animals/DT_AnimalsData.json`);
    iconDB: Datatable<RawAnimalIcons>[] = readAsset(`ProjectCoral/Content/ProjectCoral/Core/Data/Animals/DT_AnimalIcon.json`);


    constructor(protected itemMap: Map<string, Item>) {
        super();

    }

    handleEntry(itemKey: string, dbItem: RawAnimal): AnimalData | undefined {


        const variants = dbItem
            .animalClasses
            .map(entry => Object.keys(entry))
            .flat();

        const rows = this.iconDB[0].Rows;
        const itemKeyLowerCase = itemKey.toLowerCase()

        const mappedVariants: AnimalData["variants"] = variants.map(variant => {

            const row = rows[Object.keys(rows).find(key => key.toLowerCase() === itemKeyLowerCase) ?? ''];
            const adult = row?.icons.find(iconEntry => !!iconEntry[variant])?.[variant].adult;

            if (!row) return null;

            const adultIcon = adult ? AssetPathNameToIcon(adult.AssetPathName) : null;
            return {
                variant: getEnumValue(variant),
                icons: {
                    adult: adultIcon === 'None' ? null : adultIcon
                }
            }

        }).filter(nonNullable)

        return {
            key: itemKey,
            variants: mappedVariants,
            building: getEnumValue(dbItem.requiredRanchBuilding),
            daysToGrow: dbItem.daysNeededToGrow,
            harvestCooldown: dbItem.harvestCooldown,
            animalProduceType: getEnumValue(dbItem.animalProduceType),
            baseProduceDropChance: dbItem.baseProduceDropChance,
            incrementProduceDropChance: dbItem.incrementProduceDropChance,
            itemHarvestTool: minifyItem(this.itemMap.get(dbItem.itemHarvestTool.itemID)),
            produceDropLocation: getEnumValue(dbItem.produceDropLocation),
            produces: dbItem.Produce.map(produce => {
                return {
                    minimumFriendshipLevelToSpawn: produce.minimumFriendshipLevelToSpawn,
                    small: minifyItem(this.itemMap.get(produce.itemSmall.itemID)),
                    large: minifyItem(this.itemMap.get(produce.itemLarge.itemID)),
                    smallGolden: minifyItem(this.itemMap.get(produce.itemSmallGolden.itemID)),
                    largeGolden: minifyItem(this.itemMap.get(produce.itemLargeGolden.itemID)),
                }
            })
        };
    }

}
