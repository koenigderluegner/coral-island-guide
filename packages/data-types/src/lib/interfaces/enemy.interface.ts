import { ChancePerItem } from "./chance-per-item.interface";

export interface Enemy {
    key: string;
    displayName: string,
    description: string | null,
    iconName: string;
    image: string | null;
    dropRates: ChancePerItem[];
    experience: number;
}
