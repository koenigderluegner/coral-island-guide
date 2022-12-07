import { ItemIconComponent } from "../shared/components/item-icon/item-icon.component";
import { GridPlaceable } from "./interfaces/grid-placeable.interface";

export const PlaceableItemsMap: Map<string, GridPlaceable<any>> = new Map<string, GridPlaceable<any>>();

PlaceableItemsMap.set('spinkler1', {
    component: ItemIconComponent,
    width: 1,
    height: 1,
    layer: 2,
    inputs: new Map<string, unknown>([
        ['itemName', 'Items_Sprinkler.png']
    ])
});

PlaceableItemsMap.set('yogurtmachine', {
    component: ItemIconComponent,
    width: 2,
    height: 2,
    layer: 2,
    inputs: new Map<string, unknown>([
        ['itemName', 'Yogurt_Machine.png']
    ])
})

