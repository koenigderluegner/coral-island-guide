import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { MatCheckbox } from "@angular/material/checkbox";
import { AsyncPipe, KeyValuePipe, TitleCasePipe } from "@angular/common";
import { BoughtChecklistService } from "../../../core/services/checklists/bought-checklist.service";
import { BaseItemChecklistComponent } from "../base-item-checklist.component";
import { DatabaseItemDetailsComponent } from "../../../shared/components/database-item-details/database-item-details.component";
import { DatabaseItemDetailsDirective } from "../../../shared/directives/database-item-details.directive";
import { BuyAtComponent } from "../../../shared/components/database-item-details/buy-at/buy-at.component";

@Component({
    selector: 'app-bought-checklist',
    templateUrl: './bought-checklist.component.html',
    imports: [
        MatTab,
        ReactiveFormsModule,
        MatTabGroup,
        ListDetailContainerComponent,
        ItemIconComponent,
        MatCheckbox,
        AsyncPipe,
        DatabaseItemDetailsComponent,
        KeyValuePipe,
        DatabaseItemDetailsDirective,
        BuyAtComponent,
        TitleCasePipe
    ]
})
export class BoughtChecklistComponent extends BaseItemChecklistComponent {
    checklistService = inject(BoughtChecklistService);
    checklistDefinition$ = this._database.fetchBoughtChecklist$()

    constructor() {
        super();
    }
}
