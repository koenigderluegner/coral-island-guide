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
import { ToDoService } from "../../../core/services/to-do.service";
import { ToDoCategory } from "../../../core/enums/todo-category.enum";
import { filter } from "rxjs";
import { MatCheckbox } from "@angular/material/checkbox";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-to-do-entry-base',
    templateUrl: './to-do-entry-base.component.html',
    styleUrls: ['./to-do-entry-base.component.scss'],
})
export class ToDoEntryBaseComponent implements OnInit {

    @Input() amount?: number;
    @Input() quality?: Quality | undefined;
    @Input({required: true}) item!: MinimalItem;
    @Input({required: true}) category!: ToDoCategory;
    @Output() markedAsComplete: EventEmitter<MinimalItem> = new EventEmitter<MinimalItem>();
    @ViewChild(MatCheckbox, {static: true}) checkbox?: MatCheckbox;
    todoService: ToDoService = inject(ToDoService)
    protected qualities = Quality;
    @HostBinding('class.opacity-50') protected isChecked = false;
    private _destroyRef = inject(DestroyRef);

    ngOnInit() {
        this.todoService.categoryCompleted$().pipe(
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
        this.todoService.updateStatus(this.category, this.item, isChecked)
    }
}
