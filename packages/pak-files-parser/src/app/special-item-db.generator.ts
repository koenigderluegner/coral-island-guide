import { convertToIconName, getReferencedString, readAsset } from '../util/functions';
import { SpecialItem } from '@ci/data-types';
import { BaseGenerator } from "./base-generator.class";
import { RawSpecialItem } from "../interfaces/raw-data-interfaces/raw-special-item.interface";
import { Datatable } from "../interfaces/datatable.interface";
import { StringTable } from "../util/string-table.class";

export class SpecialItemDbGenerator extends BaseGenerator<RawSpecialItem, SpecialItem> {

    datatable: Datatable<RawSpecialItem>[] = readAsset<Datatable<RawSpecialItem>[]>('ProjectCoral/Content/ProjectCoral/Core/Data/ItemSpecial/DT_ItemSpecial.json');

    handleEntry(itemKey: string, dbItem: RawSpecialItem): SpecialItem | undefined {

        return {
            id: itemKey,
            displayName: StringTable.getString(dbItem.name) ?? '',
            description: dbItem.description.SourceString,
            iconName: convertToIconName(getReferencedString(dbItem.icon.ObjectName)).replace('.png', ''),
        };
    }


}
