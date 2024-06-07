import { BaseGenerator } from "../_base/base-generator.class";
import { TornPageData } from "@ci/data-types";
import { readAsset } from "../../../util/functions";
import { Datatable } from "../../../interfaces/datatable.interface";
import { StringTable } from "../../../util/string-table.class";
import { RawTornPage } from "../../../interfaces/raw-data-interfaces/raw-torn-page.interface";


export class TornPagesGenerator extends BaseGenerator<RawTornPage, TornPageData> {

    datatable: Datatable<RawTornPage>[];

    constructor() {
        super();
        this.datatable = readAsset<Datatable<RawTornPage>[]>('ProjectCoral/Content/ProjectCoral/Data/TornPages/DT_TornPages.json');
    }

    handleEntry(itemKey: string, dbItem: RawTornPage): TornPageData | undefined {

        return {
            key: itemKey,
            title: StringTable.getString(dbItem.titleText),
            content: StringTable.getString(dbItem.contentText) ?? '',
            pageType: dbItem.type

        };
    }

}
