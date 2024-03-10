import { BaseGenerator } from "./base-generator.class";
import { Festival } from "@ci/data-types";
import { Datatable } from "../../interfaces/datatable.interface";
import { AssetPathNameToIcon, readAsset } from "../../util/functions";
import { addSpacesToPascalCase } from "@ci/util";
import { RawFestival } from "../../interfaces/raw-data-interfaces/raw-festival.interface";
import { StringTable } from "../../util/string-table.class";

export class FestivalDbGenerator extends BaseGenerator<RawFestival, Festival> {
    datatable: Datatable<RawFestival>[] = readAsset(`ProjectCoral/Content/ProjectCoral/Data/Calendar/DT_Events.json`);


    constructor() {
        super();

    }

    handleEntry(itemKey: string, dbItem: RawFestival): Festival | undefined {


        return {
            eventId: dbItem.eventID,
            displayName: StringTable.getString(dbItem.eventsName) ?? addSpacesToPascalCase(dbItem.eventID),
            iconName: AssetPathNameToIcon(dbItem.icon),
            image: AssetPathNameToIcon(dbItem.image),
        };
    }

}
