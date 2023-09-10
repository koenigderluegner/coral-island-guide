import { convertToIconName, getReferencedString, getSourceStringResult, readAsset } from '../util/functions';
import { SpecialItem } from '@ci/data-types';
import { BaseGenerator } from "./base-generator.class";
import { RawSpecialItem } from "../interfaces/raw-data-interfaces/raw-special-item.interface";
import { Datatable } from "../interfaces/datatable.interface";

export class SpecialItemDbGenerator extends BaseGenerator<RawSpecialItem, SpecialItem> {

    datatable: Datatable<RawSpecialItem>[] = readAsset<Datatable<RawSpecialItem>[]>('ProjectCoral/Content/ProjectCoral/Core/Data/ItemSpecial/DT_ItemSpecial.json');

    handleEntry(itemKey: string, dbItem: RawSpecialItem): SpecialItem | undefined {

        return {
            id: itemKey,
            displayName: getSourceStringResult(dbItem.name),
            description: dbItem.description.SourceString,
            iconName: convertToIconName(getReferencedString(dbItem.icon.ObjectName)).replace('.png', ''),
        };
    }


}
