import { convertToIconName, readAsset } from '../util/functions';
import { TagBasedItem } from '@ci/data-types';
import { RawTagBasedItemGeneric } from '../interfaces/raw-tag-based-item-generic.interface';
import { BaseGenerator } from './base-generator.class';
import { Datatable } from '../interfaces/datatable.interface';

export class TagBasedItemGenericDbGenerator extends BaseGenerator<RawTagBasedItemGeneric, TagBasedItem> {

    datatable: Datatable<RawTagBasedItemGeneric>[];

    constructor() {
        super();
        this.datatable = readAsset('ProjectCoral/Content/ProjectCoral/Core/Data/DT_TagBasedItemGeneric.json');

    }


    handleEntry(itemKey: string, dbItem: RawTagBasedItemGeneric): TagBasedItem {
        return {
            key: itemKey,
            tags: dbItem.tagQuery.TagDictionary.map(t => t.TagName),
            iconName: convertToIconName(dbItem.icon.AssetPathName.split('.').pop() ?? ''),
            displayName: dbItem.readableText.SourceString ?? dbItem.tagQuery.UserDescription ?? itemKey
        };
    }


}
