import { readAsset } from "../../../util/functions";
import { Datatable } from "../../../interfaces/datatable.interface";
import { RawLocationInfo } from "../../../interfaces/raw-data-interfaces/raw-location-info.interface";
import { BaseGenerator } from "../_base/base-generator.class";
import { LocationInfo } from "@ci/data-types";
import { StringTable } from "../../../util/string-table.class";
import { addSpacesToPascalCase, getEnumValue } from "@ci/util";


export class LocationInfoGenerator extends BaseGenerator<RawLocationInfo, LocationInfo> {

    datatable: Datatable<RawLocationInfo>[] = readAsset<Datatable<RawLocationInfo>[]>('ProjectCoral/Content/ProjectCoral/Core/Data/AI/Dialogue/DT_LocationAreaInfo.json');

    handleEntry(itemKey: string, dbItem: RawLocationInfo): LocationInfo | undefined {
        const location = StringTable.getString(dbItem.locationText);
        return {
            id: itemKey,
            location: location ? location : addSpacesToPascalCase(itemKey),
            worldLocation: getEnumValue(dbItem.worldLocation)
        };
    }
}
