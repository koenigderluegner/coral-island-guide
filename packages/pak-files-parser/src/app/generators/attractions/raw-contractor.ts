import { SourceString } from "../../../types/source-string.type";
import { DatatableRef } from "../../../types/datatable-ref.type";
import { ObjectPath } from "../../../types/object-path.type";

export type RawContractor = {
    contractorName: SourceString,
    contractorNpcList: DatatableRef[],
    contractorNpcTextureList: ObjectPath[]
}
