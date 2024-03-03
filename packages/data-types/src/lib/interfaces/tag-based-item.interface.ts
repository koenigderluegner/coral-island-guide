import { MinimalItem } from "../types/minimal-item.type";

export interface TagBasedItem {
    key: string;
    tags: string[];
    iconName: string;
    displayName: string;
    items: MinimalItem[]
}
