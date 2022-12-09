import { MinimalItem } from '../types/minimal-item.type';
import { TagBasedItem } from "./tag-based-item.interface";

export interface ItemProcessing {
    day: number,
    time: {
        hours: number,
        minutes: number
    }
    genericInput: null | {
        key: string;
        amount: number;
        genericItem?: TagBasedItem
    }
    output: { item: MinimalItem, amount: number };
    input: { item: MinimalItem, amount: number }
    additionalInput: { item: MinimalItem, amount: number; }[];
    useCategory: boolean,
}
