import { AssetMap } from '../../types/asset-map.type';
import { AssetPath } from '../../types/asset-path.type';
import { DatatableRef } from '../../types/datatable-ref.type';
import { ItemDatatableRef } from '../../types/item-datatable-ref';

export interface RawAnimal {
    animalClasses: AssetMap<AssetPath>[];
    requiredRanchBuilding: string;
    daysNeededToGrow: number;
    harvestCooldown: number;
    Produce: {
        minimumFriendshipLevelToSpawn: number;
        itemSmall: ItemDatatableRef;
        itemMedium: ItemDatatableRef;
        itemLarge: ItemDatatableRef;
        itemSmallGolden: ItemDatatableRef;
        itemMediumGolden: ItemDatatableRef;
        itemLargeGolden: ItemDatatableRef;
    }[];
    animalProduceType: string;
    produceDropLocation: string;
    baseProduceDropChance: number;
    incrementProduceDropChance: number;
    harvestTool: string;
    itemHarvestTool: ItemDatatableRef;
}
