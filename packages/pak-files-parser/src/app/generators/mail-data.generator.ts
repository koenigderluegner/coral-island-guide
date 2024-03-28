import { BaseGenerator } from "./base-generator.class";
import { MailData } from "@ci/data-types";
import { readAsset } from "../../util/functions";
import { Datatable } from "../../interfaces/datatable.interface";
import { RawMailData } from "../../interfaces/raw-mail-data.interface";
import { StringTable } from "../../util/string-table.class";
import { getEnumValue } from "@ci/util";


export class MailDataGenerator extends BaseGenerator<RawMailData, MailData> {

    datatable: Datatable<RawMailData>[];

    constructor() {
        super();
        this.datatable = readAsset<Datatable<RawMailData>[]>('ProjectCoral/Content/ProjectCoral/Data/Mail/DT_Mail.json');
    }

    handleEntry(itemKey: string, dbItem: RawMailData): MailData | undefined {


        const effects = this.getEffects(itemKey);


        const mailType: string = getEnumValue(dbItem.mailtype);

        return {
            key: itemKey,
            sender: StringTable.getString(dbItem.sender),
            title: StringTable.getString(dbItem.title),
            content: StringTable.getString(dbItem.content) ?? '',
            isImportant: dbItem.isImportantMail,
            tags: dbItem.tags,
            mailType: mailType === 'None' ? null : mailType,
            greetCloseMessage: StringTable.getString(dbItem.greetclosemessage),
            greetOpenMessage: StringTable.getString(dbItem.greetopenmessage),
            ...(effects.length ? {effects} : {})
        };
    }

}
