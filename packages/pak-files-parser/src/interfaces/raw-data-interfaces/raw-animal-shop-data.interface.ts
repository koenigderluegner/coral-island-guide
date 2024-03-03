import { DatatableRef } from "../../types/datatable-ref.type";
import { SourceString } from "../../types/source-string.type";

export interface RawAnimalShopData {
    "price": number,
    "SellPrice": number,
    "amountOnPurchase": number,
    "townRank": number,
    "isLimitedItem": boolean,
    "itemLimit": number,
    "animal": DatatableRef,
    "isAdult": boolean,
    "description": SourceString,
    "readableCategory": SourceString,
    "readableRequirement": SourceString,
    "readableName": SourceString,
    "priority": number
}
