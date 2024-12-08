import { booleanAttribute, Component, inject, input } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { CookingRecipe } from "@ci/data-types";
import { DatabaseService } from "../../../../shared/services/database.service";
import { ResponsiveTableComponent } from "../../../../shared/components/responsive-table/responsive-table.component";
import { MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatTable } from "@angular/material/table";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { ItemIconComponent } from "../../../../shared/components/item-icon/item-icon.component";
import { TableItemListComponent } from "../../../../shared/components/table-item-list/table-item-list.component";
import { CookingRecipeIngredientsPipe } from "../../../../shared/pipes/cooking-recipe-ingredients.pipe";
import { KeyValuePipe, TitleCasePipe } from "@angular/common";
import { CastToMinimalItemArrayPipe } from "../../../../shared/pipes/cast-to-minimal-item-array.pipe";
import { MoneyComponent } from "../../../../shared/components/money/money.component";
import { RouterLink } from "@angular/router";
import { AddSpacesToPascalCasePipe } from "../../../../shared/pipes/add-spaces-to-pascal-case.pipe";

@Component({
    selector: 'app-cooking-table',
    templateUrl: './cooking-table.component.html',

    imports: [
        ResponsiveTableComponent,
        MatTable,
        MatSort,
        MatColumnDef,
        ItemIconComponent,
        TableItemListComponent,
        CookingRecipeIngredientsPipe,
        KeyValuePipe,
        CastToMinimalItemArrayPipe,
        MatHeaderCell,
        MoneyComponent,
        RouterLink,
        MatCell,
        AddSpacesToPascalCasePipe,
        TitleCasePipe,
        MatRow,
        MatHeaderRow,
        MatSortHeader
    ]
})
export class CookingTableComponent extends BaseTableComponent<CookingRecipe> {

    readonly showUtensil = input(false, {transform: booleanAttribute})
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'outputName',
        'ingredients',
        'sellPrice',
        'unlock'
    ];
    protected cookingUtensilMapping = inject(DatabaseService).getCookingUtensilMapping();

    override sortingDataAccessor = (item: CookingRecipe, property: string) => {

        const sortHelperValue = this.sortHelper(item.item, property)

        if (sortHelperValue !== null) return sortHelperValue;

        return 0;

    };

    protected override setupDataSource(dataSource: ReturnType<BaseTableComponent<CookingRecipe>["dataSource"]>) {
        super.setupDataSource(dataSource);

        const utensilIndex = this.displayedColumns.indexOf('utensil');
        if (this.showUtensil() && utensilIndex === -1) {
            this.displayedColumns.splice(3, 0, 'utensil');
            this.displayHeaderColumns = this.displayedColumns.filter(col => col !== 'icon');
        } else if (!this.showUtensil() && utensilIndex !== -1) {
            this.displayedColumns.splice(utensilIndex, 1);
            this.displayHeaderColumns = this.displayedColumns.filter(col => col !== 'icon');
        }
    }
}
