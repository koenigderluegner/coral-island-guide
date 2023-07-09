import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MinimalItem, Quality } from "@ci/data-types";
import { ChecklistService } from "../../../core/services/checklist.service";
import { ChecklistCategory } from "../../../core/enums/checklist-category.enum";
import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
    selector: 'app-checklist-entry-base',
    templateUrl: './checklist-entry-base.component.html',
    styleUrls: ['./checklist-entry-base.component.scss'],
})
export class ChecklistEntryBaseComponent {

    @Input() amount?: number;
    @Input() quality?: Quality | undefined;
    @Input({required: true}) item!: MinimalItem;
    @Input({required: true}) category!: ChecklistCategory;
    @Output() markedAsComplete: EventEmitter<MinimalItem> = new EventEmitter<MinimalItem>()
    protected qualities = Quality;
    private _checklistService: ChecklistService = inject(ChecklistService)

    toggleCompletionStatus($event: MatCheckboxChange) {
        this._checklistService.updateStatus(this.category, this.item, $event.checked)
    }
}
