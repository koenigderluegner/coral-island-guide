import { Component, Input } from '@angular/core';
import { ChecklistService } from "../core/services/checklist.service";
import { Checklist } from "../core/interfaces/checklist.interface";
import { animate, style, transition, trigger } from "@angular/animations";
import { SettingsService } from "../shared/services/settings.service";
import { ChecklistCategory } from "../core/enums/checklist-category.enum";

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
    protected checklistCategory = ChecklistCategory;
    protected readonly isBeta: boolean;

    constructor(protected readonly checklistService: ChecklistService, private readonly settings: SettingsService) {
        this.checklist = this.checklistService.getCurrentChecklist();
        this.isBeta = this.settings.getSettings().useBeta;
    }

}
