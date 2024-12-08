import { Component, inject } from '@angular/core';
import { MuseumChecklistService } from "../../../core/services/checklists/museum-checklist.service";
import { BaseItemChecklistComponent } from "../base-item-checklist.component";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";
import { DatabaseItemDetailsComponent } from "../../../shared/components/database-item-details/database-item-details.component";
import { FishComponent } from "../../../shared/components/database-item-details/fish/fish.component";
import { InsectComponent } from "../../../shared/components/database-item-details/insect/insect.component";
import { ShopProcessingResultComponent } from "../../../shared/components/database-item-details/shop-processing-result/shop-processing-result.component";
import { AsyncPipe, KeyValuePipe } from "@angular/common";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { MatCheckbox } from "@angular/material/checkbox";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-museum-checklist',
    templateUrl: './museum-checklist.component.html',

    imports: [
        ListDetailContainerComponent,
        DatabaseItemDetailsComponent,
        FishComponent,
        InsectComponent,
        ShopProcessingResultComponent,
        AsyncPipe,
        MatTabGroup,
        MatTab,
        ItemIconComponent,
        MatCheckbox,
        KeyValuePipe,
        ReactiveFormsModule
    ]
})
export class MuseumChecklistComponent extends BaseItemChecklistComponent {
    checklistService = inject(MuseumChecklistService);
    checklistDefinition$ = this._database.fetchMuseumChecklist$();

    constructor() {
        super();
    }
}
