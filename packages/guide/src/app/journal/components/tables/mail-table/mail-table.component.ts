import { Component } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { MailData } from "@ci/data-types";
import { SelectionModel } from "@angular/cdk/collections";
import { ResponsiveTableComponent } from "../../../../shared/components/responsive-table/responsive-table.component";
import { MatTableModule } from "@angular/material/table";
import { RemoveTagsPipe } from "../../../../shared/pipes/remove-tags.pipe";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { AddSpacesToPascalCasePipe } from "../../../../shared/pipes/add-spaces-to-pascal-case.pipe";
import { EffectComponent } from "../../../../shared/components/effect/effect.component";
import { MatButton } from "@angular/material/button";
import { MailComponent } from "../../mail/mail.component";

@Component({
    selector: 'app-mail-table',
    templateUrl: './mail-table.component.html',
    styles: [`
        .expand-row {
            --mat-table-row-item-container-height: 0;
            --mat-table-row-item-label-text-size: 16px;
        }
    `],

    imports: [
        ResponsiveTableComponent,
        RemoveTagsPipe,
        MatSort,
        MatSortHeader,
        AddSpacesToPascalCasePipe,
        EffectComponent,
        MatButton,
        MailComponent,
        MatTableModule
    ]
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
