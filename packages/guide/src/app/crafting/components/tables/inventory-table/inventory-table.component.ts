import { Component } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { CraftingRecipe } from "@ci/data-types";

@Component({
    selector: 'app-inventory-table',
    templateUrl: './inventory-table.component.html',
    styleUrls: ['./inventory-table.component.scss'],
})
export class InventoryTableComponent extends BaseTableComponent<CraftingRecipe> {
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'outputName',
        'ingredients',
        'price',
        'unlock'
    ];

}
