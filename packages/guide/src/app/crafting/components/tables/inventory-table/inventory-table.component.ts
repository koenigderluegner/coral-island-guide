import { Component } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { CraftingRecipe } from "@ci/data-types";

@Component({
    selector: 'app-inventory-table',
    templateUrl: './inventory-table.component.html',
    standalone: false
})
export class InventoryTableComponent extends BaseTableComponent<CraftingRecipe> {
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'outputName',
        'ingredients',
        'sellPrice',
        'unlock'
    ];


    override sortingDataAccessor = (item: CraftingRecipe, property: string) => {

        const sortHelperValue = this.sortHelper(item.item, property)

        if (sortHelperValue !== null) return sortHelperValue;

        return 0;

    };

}
