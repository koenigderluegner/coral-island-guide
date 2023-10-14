import { Component } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { MailData } from "@ci/data-types";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
    selector: 'app-mail-table',
    templateUrl: './mail-table.component.html',
    styles: [`
        .expand-row {
            --mat-table-row-item-container-height: 0;
            --mat-table-row-item-label-text-size: 16px;
        }
    `]
})
export class MailTableComponent extends BaseTableComponent<MailData> {
    protected expandedRows: SelectionModel<string> = new SelectionModel<string>(true, [])
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'title',
        'sender',
        'mailType',
        'effects',
        'expand'
    ];
}
