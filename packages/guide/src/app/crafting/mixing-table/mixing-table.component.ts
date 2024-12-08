import { Component } from '@angular/core';
import { ItemMixingRecipeData } from "@ci/data-types";
import { BaseTableComponent } from "../../shared/components/base-table/base-table.component";
import { KeyValuePipe } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { ResponsiveTableComponent } from "../../shared/components/responsive-table/responsive-table.component";
import { ItemIconComponent } from "../../shared/components/item-icon/item-icon.component";
import { CookingRecipeIngredientsPipe } from "../../shared/pipes/cooking-recipe-ingredients.pipe";
import { TableItemListComponent } from "../../shared/components/table-item-list/table-item-list.component";
import { MoneyComponent } from "../../shared/components/money/money.component";
import { CastToMinimalItemArrayPipe } from "../../shared/pipes/cast-to-minimal-item-array.pipe";

@Component({
    selector: 'app-mixing-table',
    imports: [
        KeyValuePipe,
        MatSort,
        MatSortHeader,
        ResponsiveTableComponent,
        ItemIconComponent,
        CookingRecipeIngredientsPipe,
        TableItemListComponent,
        MoneyComponent,
        CastToMinimalItemArrayPipe,
        MatTableModule
    ],
    templateUrl: './mixing-table.component.html'
})
export class MixingTableComponent extends BaseTableComponent<ItemMixingRecipeData> {
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'outputName',
        'ingredients',
        'sellPrice',
    ];

    override sortingDataAccessor = (item: ItemMixingRecipeData, property: string) => {

        const sortHelperValue = this.sortHelper(item.item, property)

        if (sortHelperValue !== null) return sortHelperValue;

        return 0;

    };
}
