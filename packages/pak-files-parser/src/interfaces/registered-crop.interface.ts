import { EnumString, Season } from '@ci/data-types';
import { ItemDatatableRef } from '../types/item-datatable-ref';

export interface RegisteredCrop {
    growableSeason: EnumString<Season>[];
    isTrellisCrop: boolean;
    scytheRequirement: string;
    isRegrowable: boolean;
    regrowableLength: 0;
    regrowableLimit: number;
    canCombine: true;
    chanceToCombine: {
        chance: 5.0;
    };
    pickupableItem: ItemDatatableRef;
    floatiesConfig: {
        maxDroppedItems: 1;
        dropData: [
            {
                itemId: ItemDatatableRef;
                dropChance: number;
                dropRange: {
                    min: number;
                    max: number;
                };
            },
        ];
    };
    stages: { length: number }[];
    overrideExperience: false;
    overrideExperienceOnHarvest: 0;
    readableName: string;
    size: {
        length: number;
        width: number;
    };
    isManualEntry: false;
}
