import { Component, inject } from '@angular/core';
import { MuseumChecklistService } from "../../../core/services/checklists/museum-checklist.service";
import { BaseItemChecklistComponent } from "../base-item-checklist.component";

@Component({
    selector: 'app-museum-checklist',
    templateUrl: './museum-checklist.component.html',
})
export class MuseumChecklistComponent extends BaseItemChecklistComponent {
    checklistService = inject(MuseumChecklistService);
    checklistDefinition$ = this._database.fetchMuseumChecklist$();

    constructor() {
        super();
    }
}
