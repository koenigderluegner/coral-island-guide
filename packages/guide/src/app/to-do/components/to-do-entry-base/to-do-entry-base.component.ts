import { Component, DestroyRef, inject, input, OnInit, output, viewChild } from '@angular/core';
import { Quality } from "@ci/data-types";
import { ToDoService } from "../../../core/services/to-do.service";
import { filter } from "rxjs";
import { MatCheckbox } from "@angular/material/checkbox";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ToDoContext } from "../../../core/types/to-do-context.type";
import { ItemEntry } from "../../../shared/types/item-entry.type";
import { RarityIconComponent } from "../../../shared/components/rarity-icon/rarity-icon.component";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";

@Component({
    selector: 'app-to-do-entry-base',
    templateUrl: './to-do-entry-base.component.html',
    styleUrls: ['./to-do-entry-base.component.scss'],
    imports: [
        MatCheckbox,
        RarityIconComponent,
        ItemIconComponent
    ],

    host: {
        '[class.opacity-50]': 'isChecked'
    }
})
export class ToDoEntryBaseComponent implements OnInit {

    readonly amount = input<number>();
    readonly quality = input<Quality | undefined>();
    readonly item = input.required<ItemEntry>();
    readonly category = input.required<ToDoContext | undefined>();
    readonly entrySelected = output<ItemEntry>();
    readonly checkbox = viewChild(MatCheckbox);
    protected qualities = Quality;
    protected isChecked = false;
    #todoService = inject(ToDoService)
    #destroyRef = inject(DestroyRef);

    ngOnInit() {
        this.#todoService.categoryCompleted$().pipe(
            takeUntilDestroyed(this.#destroyRef),
            filter(category => category === this.category())
        ).subscribe({
            next: () => {
                this.toggleCompletionStatus(true);
                const checkbox = this.checkbox();
                if (checkbox)
                    checkbox.checked = true
            }
        })
    }

    toggleCompletionStatus(isChecked: boolean) {
        this.isChecked = isChecked;
        this.#todoService.updateStatus(this.category(), this.item(), isChecked)
    }
}
