import { Component, inject } from '@angular/core';
import { ToDoService } from "../core/services/to-do.service";
import { animate, style, transition, trigger } from "@angular/animations";
import { SettingsService } from "../shared/services/settings.service";
import { FormControl } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ToDo } from "../core/types/to-do.type";
import { ToDoContext, ToDoContextDisplayNames, ToDoContexts } from "../core/types/to-do-context.type";

@Component({
    selector: 'app-to-do',
    templateUrl: './to-do.component.html',
    styles: [`
        app-to-do-partial:not(.hidden) ~ .show-when-none-displayed {
            display: none;
        }
    `],
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
export class ToDoComponent {

    toDoContexts = ToDoContexts;
    toDoContextDisplayNames = ToDoContextDisplayNames;

    toDoCategoryControl: FormControl<(ToDoContext | 'all' | 'uncategorized')[]> = new FormControl(['all', ...ToDoContexts, 'uncategorized'], {nonNullable: true});
    protected toDo: ToDo[];

    protected readonly isBeta: boolean;
    protected readonly toDoService = inject(ToDoService);
    private hadAllBefore = true;
    private readonly settings = inject(SettingsService)

    constructor() {
        this.toDo = this.toDoService.getCurrentToDo();
        this.isBeta = this.settings.getSettings().useBeta;

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
