import { Component } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { CraftingRecipe } from "@ci/data-types";
import { TableItemListComponent } from "../../../../shared/components/table-item-list/table-item-list.component";
import { CraftingRecipeIngredientsPipe } from "../../../../shared/pipes/crafting-recipe-ingredients.pipe";
import { MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatTable } from "@angular/material/table";
import { MoneyComponent } from "../../../../shared/components/money/money.component";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { ItemIconComponent } from "../../../../shared/components/item-icon/item-icon.component";
import { ResponsiveTableComponent } from "../../../../shared/components/responsive-table/responsive-table.component";

@Component({
    selector: 'app-inventory-table',
    templateUrl: './inventory-table.component.html',

    imports: [
        TableItemListComponent,
        CraftingRecipeIngredientsPipe,
        MatCell,
        MatHeaderCell,
        MatColumnDef,
        MoneyComponent,
        MatHeaderRow,
        MatRow,
        MatSortHeader,
        ItemIconComponent,
        MatTable,
        MatSort,
        ResponsiveTableComponent
    ]
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
