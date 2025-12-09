import { ItemDatatableRef } from '../../types/item-datatable-ref';
import { ObjectPath } from '../../types/object-path.type';

export interface RawEnemyData {
    animalClass: ObjectPath;
    possibleEnemiesDrops: {
        dropItem: ItemDatatableRef;
        dropChance: number;
    }[];
    experiencePoint: number;
    healthLevelModifier: ObjectPath;
    attackLevelModifier: ObjectPath;
    defenseLevelModifier: null;
}
