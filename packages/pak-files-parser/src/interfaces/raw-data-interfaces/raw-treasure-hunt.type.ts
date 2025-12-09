import { ItemDatatableRef } from "../../types/item-datatable-ref";
import { AssetPath } from "../../types/asset-path.type";

export type RawTreasureHunt = {
    "treasureId": number,
    "mapItemData": ItemDatatableRef,
    "treasureLocationImage": AssetPath
}
