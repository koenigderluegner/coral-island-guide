import { booleanAttribute, Component, computed, input } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { OfferingAltar } from "@ci/data-types";

@Component({
    selector: 'app-offerings-table',
    templateUrl: './offerings-table.component.html',
    standalone: false
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
