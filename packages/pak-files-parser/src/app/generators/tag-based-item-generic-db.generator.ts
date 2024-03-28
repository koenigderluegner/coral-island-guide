import { convertToIconName, minifyItem, readAsset } from '../../util/functions';
import { Item, TagBasedItem } from '@ci/data-types';
import { RawTagBasedItemGeneric } from '../../interfaces/raw-data-interfaces/raw-tag-based-item-generic.interface';
import { BaseGenerator } from './base-generator.class';
import { Datatable } from '../../interfaces/datatable.interface';
import { StringTable } from "../../util/string-table.class";
import { nonNullable } from "@ci/util";

export class TagBasedItemGenericDbGenerator extends BaseGenerator<RawTagBasedItemGeneric, TagBasedItem> {

    datatable: Datatable<RawTagBasedItemGeneric>[];
    items: Item[];

    constructor(protected itemMap: Map<string, Item>) {
        super();
        this.datatable = readAsset('ProjectCoral/Content/ProjectCoral/Core/Data/DT_TagBasedItemGeneric.json');
        this.items = [...itemMap.values()];
    }


    handleEntry(itemKey: string, dbItem: RawTagBasedItemGeneric): TagBasedItem {
        const tags = dbItem.tagQuery.TagDictionary.map(t => t.TagName);

        const tagBasedItems = this.items
            .filter(i => tags.some(t => (i.tags?.indexOf(t) ?? -1) >= 0))
            .map(minifyItem)
            .filter(nonNullable)

        return {
            key: itemKey,
            tags,
            iconName: convertToIconName(dbItem.icon.AssetPathName.split('.').pop() ?? '').replace('.png', ''),
            displayName: StringTable.getString(dbItem.readableText) ?? itemKey,
            items: tagBasedItems
        };
    }


}
