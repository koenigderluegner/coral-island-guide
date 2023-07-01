import { Component } from '@angular/core';
import { ChecklistService } from "../core/services/checklist.service";
import { Checklist } from "../core/interfaces/checklist.interface";

@Component({
    selector: 'app-checklist',
    templateUrl: './checklist.component.html'
})
export class ChecklistComponent {

    protected checklist: Checklist;

    constructor(private readonly _checklistService: ChecklistService) {
        this.checklist = this._checklistService.getCurrentChecklist()
    }

}
