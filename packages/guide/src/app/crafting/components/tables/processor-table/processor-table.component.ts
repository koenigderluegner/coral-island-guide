import { booleanAttribute, Component, inject, Input } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { ItemProcessing } from "@ci/data-types";
import { DatabaseService } from "../../../../shared/services/database.service";

@Component({
    selector: 'app-processor-table',
    templateUrl: './processor-table.component.html',
})
export class ProcessorTableComponent extends BaseTableComponent<ItemProcessing> {

    @Input({transform: booleanAttribute}) showProcessor = false
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

    protected override setupDataSource(dataSource: BaseTableComponent<ItemProcessing>["dataSource"]) {
        super.setupDataSource(dataSource);

        const utensilIndex = this.displayedColumns.indexOf('processor');
        if (this.showProcessor && utensilIndex === -1) {
            this.displayedColumns.splice(3, 0, 'processor');
            this.displayHeaderColumns = this.displayedColumns.filter(col => col !== 'icon');
        } else if (!this.showProcessor && utensilIndex !== -1) {
            this.displayedColumns.splice(utensilIndex, 1);
            this.displayHeaderColumns = this.displayedColumns.filter(col => col !== 'icon');
        }
    }
}
