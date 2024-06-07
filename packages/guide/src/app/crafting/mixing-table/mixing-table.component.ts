import { Component } from '@angular/core';
import { ItemMixingRecipeData } from "@ci/data-types";
import { BaseTableComponent } from "../../shared/components/base-table/base-table.component";
import { AddSpacesToPascalCasePipe } from "../../shared/pipes/add-spaces-to-pascal-case.pipe";
import { KeyValuePipe, TitleCasePipe } from "@angular/common";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from "@angular/material/table";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { SharedModule } from "../../shared/shared.module";

@Component({
    selector: 'app-mixing-table',
    standalone: true,
    imports: [
        AddSpacesToPascalCasePipe,
        KeyValuePipe,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatTable,
        SharedModule,
        TitleCasePipe,
        MatHeaderCellDef
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
