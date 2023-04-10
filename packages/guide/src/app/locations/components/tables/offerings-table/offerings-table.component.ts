import { Component, Input } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { OfferingAltar } from "@ci/data-types";
import { coerceBooleanProperty } from "@angular/cdk/coercion";

@Component({
    selector: 'app-offerings-table',
    templateUrl: './offerings-table.component.html',
})
export class OfferingsTableComponent extends BaseTableComponent<OfferingAltar> {
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'displayName',
        'numOfItemRequired',
        'requiredItems',
        'rewards'
    ];
    private _datasource: OfferingAltar[] = []

    @Input()
    override get dataSource(): OfferingAltar[] {
        return this._datasource
    }

    override set dataSource(altars: OfferingAltar[]) {
        const results: OfferingAltar[] = [];

        altars.forEach(altar => {
            altar.offerings.forEach(offering => {
                results.push({...altar, offerings: [offering]})
            })
        })
        this._datasource = results;
    }


    _showAltar = false;

    @Input()
    get showAltar(): boolean {
        return this._showAltar;
    }

    set showAltar(showAltar: boolean | number | string | null | undefined) {
        this._showAltar = coerceBooleanProperty(showAltar);
    }

    protected override setupDataSource(dataSource: OfferingAltar[]) {
        super.setupDataSource(dataSource);

        const altarIndex = this.displayedColumns.indexOf('altar');
        if (this._showAltar && altarIndex === -1) {
            this.displayedColumns.splice(2, 0, 'altar');
            this.displayHeaderColumns = this.displayedColumns.filter(col => col !== 'icon');
        } else if (!this._showAltar && altarIndex !== -1) {
            this.displayedColumns.splice(altarIndex, 1);
            this.displayHeaderColumns = this.displayedColumns.filter(col => col !== 'icon');
        }
    }


}
