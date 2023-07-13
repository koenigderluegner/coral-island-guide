import { Component, Input } from '@angular/core';
import { ChecklistService } from "../core/services/checklist.service";
import { Checklist } from "../core/interfaces/checklist.interface";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'app-checklist',
    templateUrl: './checklist.component.html',
    animations: [
        trigger(
            'leaveAnimation',
            [
                transition(
                    ':leave',
                    [
                        style({height: '*', opacity: 1}),
                        animate('200ms ease-in',
                            style({height: 0, opacity: 0}))
                    ]
                )
            ]
        )
    ]
})
export class ChecklistComponent {

    @Input() checklistId?: string;

    protected checklist: Checklist;

    constructor(private readonly _checklistService: ChecklistService) {
        this.checklist = this._checklistService.getCurrentChecklist()
    }

}
