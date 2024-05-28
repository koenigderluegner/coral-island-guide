import { BaseGenerator } from "../_base/base-generator.class";
import { Datatable } from "../../../interfaces/datatable.interface";
import { readAsset } from "../../../util/functions";


export class GridZonesDbGenerator extends BaseGenerator<{ parentZone: { RowName: string } }, string> {
    datatable: Datatable<{ parentZone: { RowName: string } }>[];

    constructor(protected gridZonesPath: string) {
        super();

        this.datatable = readAsset<Datatable<{ parentZone: { RowName: string } }>[]>(gridZonesPath);
    }

    handleEntry(itemKey: string, dbItem: { parentZone: { RowName: string } }): string | undefined {
        return dbItem.parentZone.RowName !== 'None' ? dbItem.parentZone.RowName : itemKey;
    }

}
