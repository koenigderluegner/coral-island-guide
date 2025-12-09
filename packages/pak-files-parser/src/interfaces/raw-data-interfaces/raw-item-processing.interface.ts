import { DatatableRef } from "../../types/datatable-ref.type";
import { ItemDatatableRef } from "../../types/item-datatable-ref";

export interface RawItemProcessing {
    "useCategory": boolean,
    "input": {
        "item": ItemDatatableRef,
        "amount": number
    },
    "category": {
        "data": DatatableRef
    },
    "useGenericRequirement": boolean,
    "genericInput": {
        "genericItem": {
            "DataTable": null | string,
            "RowName": "None"
        },
        "amount": number
    },
    "inputAmount": number,
    "additionalInput": {
        "item": ItemDatatableRef,
        "amount": number
    }[],
    "output": ItemDatatableRef,
    "amount": number,
    "day": number,
    "time": {
        "hours": number,
        "minutes": number
    }
}
