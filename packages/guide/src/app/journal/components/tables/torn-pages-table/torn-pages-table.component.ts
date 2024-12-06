import { Component } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { TornPageData } from "@ci/data-types";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
    selector: 'app-torn-pages-table',
    templateUrl: './torn-pages-table.component.html',
    styles: [`
        .expand-row {
            --mat-table-row-item-container-height: 0;
            --mat-table-row-item-label-text-size: 16px;
        }
    `],
    standalone: false
})
export class TornPagesTableComponent extends BaseTableComponent<TornPageData> {
    protected expandedRows: SelectionModel<string> = new SelectionModel<string>(true, [])
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'title',
        'expand'
    ];
}
