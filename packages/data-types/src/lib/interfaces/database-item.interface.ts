import { Fish, Item } from "@ci/data-types";

export interface DatabaseItem extends Item{
    fish?: Omit<Fish, 'item'>;
}
