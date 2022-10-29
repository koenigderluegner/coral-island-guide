import { MinimalItem } from '../types/minimal-item.type';

export interface ItemProcessing {
    day: number,
    time: {
        hours: number,
        minutes: number
    }
    output: { item: MinimalItem, amount: number };
    input: { item: MinimalItem, amount: number }
    additionalInput: { item: MinimalItem, amount: number; }[];
    useCategory: boolean,
}