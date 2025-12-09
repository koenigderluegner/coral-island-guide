import { SourceString } from '../../types/source-string.type';
import { ItemDatatableRef } from '../../types/item-datatable-ref';
import { AssetPath } from '../../types/asset-path.type';

export interface RawMusuemChecklist {
    item: ItemDatatableRef;
    category: string;
    description: SourceString;
    objectMesh: AssetPath;
    objectMaterials: AssetPath[];
    displayActorType: string;
}
