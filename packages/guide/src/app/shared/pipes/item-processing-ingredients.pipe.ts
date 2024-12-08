import { Pipe, PipeTransform } from '@angular/core';
import { GenericEntry, ItemEntry, ItemProcessing } from "@ci/data-types";
import { ItemListComponent } from "../components/item-list/item-list.component";

@Pipe({
    name: 'itemProcessingIngredients',
    standalone: false
})
export class ItemProcessingIngredientsPipe implements PipeTransform {

    transform(itemProcessing: ItemProcessing): (ItemEntry | GenericEntry)[] {
        const items: ReturnType<ItemListComponent['itemList']> = [itemProcessing.input, ...itemProcessing.additionalInput];
        if (itemProcessing.genericInput) {
            const genericInput: GenericEntry = {
                ...itemProcessing.genericInput,
                shouldBeSameItem: true,
            }

            items.push(genericInput)
        }
        return items;
    }

}
