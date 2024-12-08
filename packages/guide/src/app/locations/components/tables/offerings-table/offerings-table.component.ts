import { booleanAttribute, Component, computed, input } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { OfferingAltar } from "@ci/data-types";
import { ResponsiveTableComponent } from "../../../../shared/components/responsive-table/responsive-table.component";
import { MatTableModule } from "@angular/material/table";
import { ItemIconComponent } from "../../../../shared/components/item-icon/item-icon.component";
import { TableItemListComponent } from "../../../../shared/components/table-item-list/table-item-list.component";
import { MatSortHeader } from "@angular/material/sort";

@Component({
    selector: 'app-offerings-table',
    templateUrl: './offerings-table.component.html',

    imports: [
        ResponsiveTableComponent,
        MatTableModule,
        ItemIconComponent,
        TableItemListComponent,
        MatSortHeader
    ]
})
export class OfferingsTableComponent extends BaseTableComponent<OfferingAltar> {
    readonly showAltar = input(false, {transform: booleanAttribute})
    override _dataSource = computed(() => {
        const results: OfferingAltar[] = [];

        this.dataSource().forEach(altar => {
            altar.offerings.forEach(offering => {
                results.push({...altar, offerings: [offering]})
            })
        })

        return results;
    })
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'displayName',
        'numOfItemRequired',
        'requiredItems',
        'rewards'
    ];

    protected override setupDataSource(dataSource: OfferingAltar[]) {
        super.setupDataSource(dataSource);

        const altarIndex = this.displayedColumns.indexOf('altar');
        if (this.showAltar() && altarIndex === -1) {
            this.displayedColumns.splice(2, 0, 'altar');
            this.displayHeaderColumns = this.displayedColumns.filter(col => col !== 'icon');
        } else if (!this.showAltar() && altarIndex !== -1) {
            this.displayedColumns.splice(altarIndex, 1);
            this.displayHeaderColumns = this.displayedColumns.filter(col => col !== 'icon');
        }
    }


}
