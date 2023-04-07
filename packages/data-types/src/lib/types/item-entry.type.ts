import { MinimalItem } from "./minimal-item.type";
import { Quality } from "../enums/quality.enum";

export type ItemEntry = {
    item?: MinimalItem;
    amount: number;
    quality?: Quality
};
