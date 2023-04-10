import { Crop, Item, Season } from '@ci/data-types';
import { readAsset } from '../util/functions';
import { RegisteredCrop } from '../interfaces/registered-crop.interface';
import { CropRegistry } from '../types/crop-registry.type';
import { getEnumValue } from '@ci/util';

export class CropsDbGenerator {

    cropRegistry: CropRegistry[];

    constructor(protected itemMap: Map<string, Item>) {
        // ProjectCoral Content ProjectCoral Core HismcManagers Crop
        this.cropRegistry = readAsset<CropRegistry[]>('DT_CropRegistry.json');

    }

    generate(): Map<string, Crop> {
        const map: Map<string, Crop> = new Map<string, Crop>();

        // RequiredToUse

        Object.keys(this.cropRegistry[0]?.Rows).forEach(itemKey => {

            const dbItem: RegisteredCrop = this.cropRegistry[0]?.Rows[itemKey];

            const seed: Item | undefined = this.itemMap.get(itemKey);

            if (seed) {
                const crop: Crop = {
                    key: itemKey,
                    item: seed,
                    size: dbItem.size,
                    canCombine: dbItem.canCombine,
                    chanceToCombine: dbItem.chanceToCombine,
                    growableSeason: dbItem.growableSeason.map(getEnumValue) as Season[],
                    growTime: dbItem.stages.map(s => s.length).reduce((p, v) => p + v, 0),
                    isRegrowable: dbItem.isRegrowable,
                    regrowableLength: dbItem.regrowableLength,
                    readableName: dbItem.readableName,
                    isTrellisCrop: dbItem.isTrellisCrop,
                    pickupableItemId: dbItem.pickupableItem.itemID,
                    pickupableItem: this.itemMap.get(dbItem.pickupableItem.itemID),
                    isScytheRequired: getEnumValue(dbItem.scytheRequirement) === 'RequiredToUse',
                    maxDroppedItems: dbItem.floatiesConfig.maxDroppedItems,
                    overrideExperience: dbItem.overrideExperience,
                    overrideExperienceOnHarvest: dbItem.overrideExperienceOnHarvest,
                    dropData: dbItem.floatiesConfig.dropData.map(dd => {
                        return {
                            itemId: dd.itemId.itemID,
                            dropChance: dd.dropChance,
                            dropRange: dd.dropRange,
                            item: this.itemMap.get(dd.itemId.itemID)
                        };
                    })


                };

                crop.item.description = crop.item.description.replace('{cropGrowLength}', '' + crop.growTime);
                crop.item.description = crop.item.description.replace('{cropRegrowLength}', '' + crop.regrowableLength);

                map.set(crop.key, crop);
            }


        });

        return map;
    }
}
