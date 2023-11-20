import { Enemy, Fish, Item, ItemProcessing } from "@ci/data-types";

export interface DatabaseItem extends Item{
    fish?: Omit<Fish, 'item'>;
    artisanResult?: ItemProcessing[];
    artisanIngredient?: ItemProcessing[];
    fromEnemies?: Enemy[]
}
