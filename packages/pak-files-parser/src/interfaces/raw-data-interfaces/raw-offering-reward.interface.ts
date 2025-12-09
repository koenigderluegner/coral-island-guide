import { SourceString } from '../../types/source-string.type';
import { DatatableRef } from '../../types/datatable-ref.type';
import { ItemDatatableRef } from '../../types/item-datatable-ref';

export interface RawOfferingReward {
    offeringId: DatatableRef;
    rewardID: string;
    description: SourceString;
    useItemMesh: boolean;
    scaleItemMesh: boolean;
    rewardItem: ItemDatatableRef;
    rewardMesh: null;
}
