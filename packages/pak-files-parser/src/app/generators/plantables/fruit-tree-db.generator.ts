import { FruitTree, Item } from '@ci/data-types';
import { minifyItem, readAsset } from '../../../util/functions';
import { CropRegistry } from '../../../types/crop-registry.type';
import { getEnumValue, nonNullable } from '@ci/util';
import { BaseGenerator } from "../_base/base-generator.class";
import { Datatable } from "../../../interfaces/datatable.interface";
import { RawFruitTree } from "../../../interfaces/raw-data-interfaces/raw-fruit-tree.interface";

export class FruitTreeDbGenerator extends BaseGenerator<RawFruitTree, FruitTree> {

    cropRegistry: CropRegistry[];
    datatable: Datatable<RawFruitTree>[] = readAsset<Datatable<RawFruitTree>[]>('ProjectCoral/Content/ProjectCoral/Core/HismcManagers/FruitTree/DT_FruitTreeRegistry.json');

    constructor(protected itemMap: Map<string, Item>) {
        super()
        // ProjectCoral Content ProjectCoral Core HismcManagers FruitTree
        this.cropRegistry = readAsset<CropRegistry[]>('ProjectCoral/Content/ProjectCoral/Core/HismcManagers/FruitTree/DT_FruitTreeRegistry.json');

    }

    handleEntry(itemKey: string, dbItem: RawFruitTree): FruitTree | undefined {


        const seed: Item | undefined = this.itemMap.get(itemKey);

        if (!seed) return undefined;

        const item: FruitTree['item'] = {...minifyItem(seed), price: seed.price}


        const growTime = dbItem.stages.map(s => s.length).reduce((p, v) => p + v, 0);
        const regrowableLength = 4;

        const crop: FruitTree = {
            key: itemKey,
            item,
            size: dbItem.size,
            growableSeason: [getEnumValue(dbItem.producingSeason)],
            growTime,
            isRegrowable: true,
            regrowableLength, // can't find a file containing this info, seems equal for all trees.
            firstYield: growTime + (regrowableLength - 1), // the first day of being grown counts as the first day of regrowing
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
