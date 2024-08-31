import { Component, inject } from '@angular/core';
import { ToDoService } from "../core/services/to-do.service";
import { SettingsService } from "../shared/services/settings.service";
import { FormControl } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ToDoContextDisplayNames, ToDoContexts } from "../core/types/to-do-context.type";
import { ToDoFilterOptions } from "./types/to-do-filter-options.type";

@Component({
    selector: 'app-to-do',
    templateUrl: './to-do.component.html',
    styles: [`
        app-to-do-partial:not(.hidden) ~ .show-when-none-displayed {
            display: none;
        }
    `]
})
export class ToDoComponent {

    toDoContexts = ToDoContexts;
    toDoContextDisplayNames = ToDoContextDisplayNames;
    toDoCategoryControl: FormControl<ToDoFilterOptions[]> = new FormControl(['all', ...ToDoContexts, 'uncategorized'], {nonNullable: true});
    protected readonly toDoService = inject(ToDoService);
    private hadAllBefore = true;

    constructor() {
        this.toDoCategoryControl.valueChanges.pipe(
            takeUntilDestroyed()
        ).subscribe({
            next: value => {
                if (this.hadAllBefore && !value.includes('all')) {
                    this.toDoCategoryControl.setValue([], {emitEvent: false})
                    this.hadAllBefore = false;
                } else if (!this.hadAllBefore && value.includes('all')) {
                    this.toDoCategoryControl.setValue(['all', ...this.toDoContexts], {emitEvent: false});
                    this.hadAllBefore = true;
                } else if (this.hadAllBefore && value.length < (this.toDoContexts.length + 1)) {
                    this.toDoCategoryControl.setValue(value.filter(s => s !== 'all'), {emitEvent: false})
                    this.hadAllBefore = false;
                }

            }
        })
    }

}
