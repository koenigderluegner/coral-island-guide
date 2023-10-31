import { MinimalTagBasedItem } from "./minimal-tag-based-item.type";

export type GenericEntry = {
    shouldBeSameItem: boolean,
    amount: number;
    genericItem?: MinimalTagBasedItem
};
