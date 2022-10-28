import { convertToIconName, readAsset } from '../util/functions';
import { Item, TagBasedItem } from '@ci/data-types';
import { TagBasedItemGenerics } from '../types/tag-based-item-generics.type';
import { RawTagBasedItemGeneric } from '../interfaces/raw-tag-based-item-generic.interface';
import { BaseGenerator } from './base-generator.class';
import { Datatable } from '../interfaces/datatable.interface';

export class TagBasedItemGenericDbGenerator extends BaseGenerator<RawTagBasedItemGeneric, TagBasedItem> {

    datatable: Datatable<RawTagBasedItemGeneric>[];

    constructor(protected itemMap: Map<string, Item>) {
        super();
        // ProjectCoral Content Project Coral Core Data
        this.datatable = readAsset<TagBasedItemGenerics[]>('DT_TagBasedItemGeneric.json');

    }


    handleEntry(itemKey: string, dbItem: RawTagBasedItemGeneric): TagBasedItem {
        return {
            key: itemKey,
            tags: dbItem.tagQuery.TagDictionary.map(t => t.TagName),
            iconName: convertToIconName(dbItem.icon.AssetPathName.split('.').pop() ?? ''),
            displayName: dbItem.readableText.SourceString
        };
    }


}