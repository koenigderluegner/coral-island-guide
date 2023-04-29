import { BaseGenerator } from "./base-generator.class";
import { Datatable } from "../interfaces/datatable.interface";
import { RawConsumable } from "../interfaces/raw-consumable.interface";
import { readAsset } from "../util/functions";
import { Consumable } from "@ci/data-types";
import { getEnumValue } from "@ci/util";

export class ConsumablesDbGenerator extends BaseGenerator<RawConsumable, Consumable> {

    datatable: Datatable<RawConsumable>[] = readAsset<Datatable<RawConsumable>[]>('ProjectCoral/Content/ProjectCoral/Core/Data/ItemLogic/DT_Consumable.json');

    handleEntry(itemKey: string, dbItem: RawConsumable): Consumable {

        const {buff, itemType, itemName, sideEffects, ...rest} = dbItem
        return {
            key: itemKey,
            ...rest,
            buff: getEnumValue(buff),
            itemType: getEnumValue(itemType)
        }
    }

}
