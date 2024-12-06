import { Component, DestroyRef, HostBinding, inject, input, OnInit, output, ViewChild } from '@angular/core';
import { Quality } from "@ci/data-types";
import { ToDoService } from "../../../core/services/to-do.service";
import { filter } from "rxjs";
import { MatCheckbox } from "@angular/material/checkbox";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ToDoContext } from "../../../core/types/to-do-context.type";
import { ItemEntry } from "../../../shared/types/item-entry.type";

@Component({
    selector: 'app-to-do-entry-base',
    templateUrl: './to-do-entry-base.component.html',
    styleUrls: ['./to-do-entry-base.component.scss'],
    standalone: false
})
export class ToDoEntryBaseComponent implements OnInit {

    amount = input<number>();
    quality = input<Quality | undefined>();
    item = input.required<ItemEntry>();
    category = input.required<ToDoContext | undefined>();
    entrySelected = output<ItemEntry>();
    @ViewChild(MatCheckbox, {static: true}) checkbox?: MatCheckbox;
    protected qualities = Quality;
    @HostBinding('class.opacity-50') protected isChecked = false;
    #todoService = inject(ToDoService)
    #destroyRef = inject(DestroyRef);

    ngOnInit() {
        this.#todoService.categoryCompleted$().pipe(
            takeUntilDestroyed(this.#destroyRef),
            filter(category => category === this.category())
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
        this.#todoService.updateStatus(this.category(), this.item(), isChecked)
    }
}
