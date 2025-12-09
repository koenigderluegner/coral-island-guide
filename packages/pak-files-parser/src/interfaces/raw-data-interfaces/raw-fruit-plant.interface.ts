import { EnumString, Season } from '@ci/data-types';
import { ObjectPath } from '../../types/object-path.type';
import { DatatableRef } from '../../types/datatable-ref.type';
import { ItemDatatableRef } from '../../types/item-datatable-ref';

export interface RawFruitPlant {
    growableSeason: EnumString<Season>[];
    stages: {
        length: number;
        healthPoint: number;
        fruitPlantMesh: ObjectPath;
    }[];
    regrowingStageData: {
        length: number;
        healthPoint: number;
        fruitPlantMesh: ObjectPath;
    };
    fruitsFloaties: {
        maxDroppedItems: number;
        dropData: {
            itemId: ItemDatatableRef;
            dropChance: number;
            dropRange: {
                min: number;
                max: number;
            };
        }[];
        dropRequirement: null;
    };
    overrideExperience: boolean;
    overrideExperienceOnHarvest: number;
    emitterOnPlanted: null;
    nonMaturedStageReactionAnim: ObjectPath;
    maturedStageReactionAnim: ObjectPath;
    seedStageReactionFX: null;
    plantStageReactionFX: ObjectPath;
    readableName: string;
    size: {
        length: number;
        width: number;
    };
    isManualEntry: boolean;
}
