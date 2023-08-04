import {
    Component,
    DestroyRef,
    EventEmitter,
    HostBinding,
    inject,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { MinimalItem, Quality } from "@ci/data-types";
import { ChecklistService } from "../../../core/services/checklist.service";
import { ChecklistCategory } from "../../../core/enums/checklist-category.enum";
import { filter } from "rxjs";
import { MatCheckbox } from "@angular/material/checkbox";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-checklist-entry-base',
    templateUrl: './checklist-entry-base.component.html',
    styleUrls: ['./checklist-entry-base.component.scss'],
})
export class ChecklistEntryBaseComponent implements OnInit {

    @Input() amount?: number;
    @Input() quality?: Quality | undefined;
    @Input({required: true}) item!: MinimalItem;
    @Input({required: true}) category!: ChecklistCategory;
    @Output() markedAsComplete: EventEmitter<MinimalItem> = new EventEmitter<MinimalItem>();
    @ViewChild(MatCheckbox, {static: true}) checkbox?: MatCheckbox;
    checklistService: ChecklistService = inject(ChecklistService)
    private _destroyRef = inject(DestroyRef);
    protected qualities = Quality;
    @HostBinding('class.opacity-50') protected isChecked = false;

    ngOnInit() {
        this.checklistService.categoryCompleted$().pipe(
            takeUntilDestroyed(this._destroyRef),
            filter(category => category === this.category)
        ).subscribe({
            next: () => {
                this.toggleCompletionStatus(true);
                if (this.checkbox)
                    this.checkbox.checked = true
            }
        })
    }

    toggleCompletionStatus(isChecked: boolean) {
        this.isChecked = isChecked;
        this.checklistService.updateStatus(this.category, this.item, isChecked)
    }
}
