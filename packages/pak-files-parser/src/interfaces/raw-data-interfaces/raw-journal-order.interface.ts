import { DatatableRef } from "../../types/datatable-ref.type";
import { ItemDatatableRef } from "../../types/item-datatable-ref";

export interface RawJournalOrder {
    "itemData": ItemDatatableRef,
    "listOrder": number
}
