import { FruitPlant, Item, Season } from '@ci/data-types';
import { minifyItem, readAsset } from '../util/functions';
import { CropRegistry } from '../types/crop-registry.type';
import { getEnumValue, nonNullable } from '@ci/util';
import { BaseGenerator } from "./base-generator.class";
import { RawFruitPlant } from "../interfaces/raw-fruit-plant.interface";
import { Datatable } from "../interfaces/datatable.interface";

export class FruitPlantDbGenerator extends BaseGenerator<RawFruitPlant, FruitPlant> {

    cropRegistry: CropRegistry[];
    datatable: Datatable<RawFruitPlant>[] = readAsset<Datatable<RawFruitPlant>[]>('ProjectCoral/Content/ProjectCoral/Core/HismcManagers/FruitPlant/DT_FruitPlantRegistry.json');

    constructor(protected itemMap: Map<string, Item>) {
        super()
        // ProjectCoral Content ProjectCoral Core HismcManagers FruitPlant
        this.cropRegistry = readAsset<CropRegistry[]>('ProjectCoral/Content/ProjectCoral/Core/HismcManagers/FruitPlant/DT_FruitPlantRegistry.json');

    }

    handleEntry(itemKey: string, dbItem: RawFruitPlant): FruitPlant | undefined {


        const seed: Item | undefined = this.itemMap.get(itemKey);

        if (!seed) return undefined;

        const item: FruitPlant['item'] = {...minifyItem(seed), price: seed.price}

        const crop: FruitPlant = {
            key: itemKey,
            item,
            size: dbItem.size,
            growableSeason: dbItem.growableSeason.map(getEnumValue) as Season[],
            growTime: dbItem.stages.map(s => s.length).reduce((p, v) => p + v, 0),
            isRegrowable: true,
            regrowableLength: dbItem.regrowingStageData.length,
            readableName: dbItem.readableName,
            maxDroppedItems: dbItem.fruitsFloaties.maxDroppedItems,
            overrideExperience: dbItem.overrideExperience,
            overrideExperienceOnHarvest: dbItem.overrideExperienceOnHarvest,
            dropData: dbItem.fruitsFloaties.dropData
                .map(dd => {
                    const ddItem = this.itemMap.get(dd.itemId.itemID);

                    if (!ddItem) return;

                    return {
                        itemId: dd.itemId.itemID,
                        dropChance: dd.dropChance,
                        dropRange: dd.dropRange,
                        item: {...minifyItem(ddItem), sellPrice: ddItem.sellPrice}
                    };
                })
                .filter(nonNullable)


        };

        seed.description = (seed.description ?? '').replace('{cropGrowLength}', '' + crop.growTime);
        seed.description = seed.description.replace('{cropRegrowLength}', '' + crop.regrowableLength);


        return crop;


    }

}
