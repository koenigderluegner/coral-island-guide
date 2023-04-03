import { FruitTree, Item, Season } from '@ci/data-types';
import { readAsset } from '../util/functions';
import { CropRegistry } from '../types/crop-registry.type';
import { getEnumValue } from '@ci/util';
import { BaseGenerator } from "./base-generator.class";
import { Datatable } from "../interfaces/datatable.interface";
import { RawFruitTree } from "../interfaces/raw-fruit-tree.interface";

export class FruitTreeDbGenerator extends BaseGenerator<RawFruitTree, FruitTree> {

    cropRegistry: CropRegistry[];
    datatable: Datatable<RawFruitTree>[] = readAsset<Datatable<RawFruitTree>[]>('DT_FruitTreeRegistry.json');

    constructor(protected itemMap: Map<string, Item>) {
        super()
        // ProjectCoral Content ProjectCoral Core HismcManagers FruitTree
        this.cropRegistry = readAsset<CropRegistry[]>('DT_FruitTreeRegistry.json');

    }

    handleEntry(itemKey: string, dbItem: RawFruitTree): FruitTree | undefined {


        const seed: Item | undefined = this.itemMap.get(itemKey);

        if (!seed) return undefined;

        const crop: FruitTree = {
            key: itemKey,
            item: seed,
            size: dbItem.size,
            growableSeason: [getEnumValue(dbItem.producingSeason) as Season],
            growTime: dbItem.stages.map(s => s.length).reduce((p, v) => p + v, 0),
            isRegrowable: true,
            regrowableLength: 1,
            readableName: dbItem.readableName,
            maxDroppedItems: dbItem.fruitsFloaties.maxDroppedItems,
            overrideExperience: dbItem.overrideExperience,
            overrideExperienceOnHarvest: dbItem.overrideExperienceOnHarvest,
            dropData: dbItem.fruitsFloaties.dropData.map(dd => {
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

        return crop;


    }

}
