import { booleanAttribute, Component, inject, input } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { ItemProcessing } from "@ci/data-types";
import { DatabaseService } from "../../../../shared/services/database.service";
import { ProcessingTimeComponent } from "../../../../shared/components/processing-time/processing-time.component";
import { TitleCasePipe } from "@angular/common";
import { AddSpacesToPascalCasePipe } from "../../../../shared/pipes/add-spaces-to-pascal-case.pipe";
import { ItemIconComponent } from "../../../../shared/components/item-icon/item-icon.component";
import { RouterLink } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { ItemProcessingIngredientsPipe } from "../../../../shared/pipes/item-processing-ingredients.pipe";
import { TableItemListComponent } from "../../../../shared/components/table-item-list/table-item-list.component";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { ResponsiveTableComponent } from "../../../../shared/components/responsive-table/responsive-table.component";
import { MoneyComponent } from "../../../../shared/components/money/money.component";

@Component({
    selector: 'app-processor-table',
    templateUrl: './processor-table.component.html',

    imports: [
        ProcessingTimeComponent,
        TitleCasePipe,
        AddSpacesToPascalCasePipe,
        ItemIconComponent,
        RouterLink,
        ItemProcessingIngredientsPipe,
        TableItemListComponent,
        MatSort,
        ResponsiveTableComponent,
        MatSortHeader,
        MoneyComponent,
        MatTableModule
    ]
})
export class ProcessorTableComponent extends BaseTableComponent<ItemProcessing> {

    readonly showProcessor = input(false, {transform: booleanAttribute})
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'outputName',
        'ingredients',
        'processingTime',
        'sellPrice',
    ];
    protected processorMapping = inject(DatabaseService).getProcessorMapping();

    override sortingDataAccessor = (item: ItemProcessing, property: string) => {

        const sortHelperValue = this.sortHelper(item.output.item, property)

        if (sortHelperValue !== null) return sortHelperValue;

        if (property === 'processingTime') {
            return item.day * 24 * 60
                + item.time.hours * 60
                + item.time.minutes
        }

        return 0;

    };

    protected override setupDataSource(dataSource: ReturnType<BaseTableComponent<ItemProcessing>["dataSource"]>) {
        super.setupDataSource(dataSource);

        const utensilIndex = this.displayedColumns.indexOf('processor');
        if (this.showProcessor() && utensilIndex === -1) {
            this.displayedColumns.splice(3, 0, 'processor');
            this.displayHeaderColumns = this.displayedColumns.filter(col => col !== 'icon');
        } else if (!this.showProcessor() && utensilIndex !== -1) {
            this.displayedColumns.splice(utensilIndex, 1);
            this.displayHeaderColumns = this.displayedColumns.filter(col => col !== 'icon');
        }
    }
}
