import { TagBasedItem } from "../interfaces/tag-based-item.interface";

export type GenericEntry = {
    shouldBeSameItem: boolean,
    amount: number;
    genericItem?: TagBasedItem
};
