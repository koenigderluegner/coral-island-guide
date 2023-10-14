import { BaseGenerator } from "./base-generator.class";
import { MailData } from "@ci/data-types";
import { readAsset } from "../util/functions";
import { Datatable } from "../interfaces/datatable.interface";
import { RawMailData } from "../interfaces/raw-mail-data.interface";
import { StringTable } from "../util/string-table.class";
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

        const greetclosemessage = StringTable.getString(dbItem.greetclosemessage);
        const greetopenmessage = StringTable.getString(dbItem.greetopenmessage);
        const sender = StringTable.getString(dbItem.sender);
        const title = StringTable.getString(dbItem.title);

        return {
            key: itemKey,
            sender: sender === 'Unknown' ? null : sender,
            title: title === 'Unknown' ? null : title,
            content: StringTable.getString(dbItem.content),
            isImportant: dbItem.isImportantMail,
            tags: dbItem.tags,
            mailType: mailType === 'None' ? null : mailType,
            greetCloseMessage: greetclosemessage === 'Unknown' ? null : greetclosemessage,
            greetOpenMessage: greetopenmessage === 'Unknown' ? null : greetopenmessage,
            ...(effects.length ? {effects} : {})
        };
    }

}
