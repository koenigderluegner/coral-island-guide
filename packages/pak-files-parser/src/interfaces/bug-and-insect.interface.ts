import { ObjectPath } from '../types/object-path.type';
import { AssetPath } from '../types/asset-path.type';
import { ItemDatatableRef } from '../types/item-datatable-ref';
import { DatatableRef } from '../types/datatable-ref.type';

export interface BugAndInsect {
    bugType: ObjectPath | AssetPath;
    BugsAndInsectsSKU: ItemDatatableRef;
    rarity: string;
    minCaughtSize: number;
    maxCaughtSize: number;
    bugsBehaviourPreset: DatatableRef;
}
