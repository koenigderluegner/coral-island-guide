import { Component } from '@angular/core';
import { ToDoService } from "../core/services/to-do.service";
import { ToDo } from "../core/interfaces/todo.interface";
import { animate, style, transition, trigger } from "@angular/animations";
import { SettingsService } from "../shared/services/settings.service";
import { ToDoCategory, ToDoCategoryDisplayNames } from "../core/enums/todo-category.enum";
import { FormControl } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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

    toDoCategoryControl: FormControl<(ToDoCategory | 'all')[]> = new FormControl<(ToDoCategory | "all")[]>(['all', ...Object.values(ToDoCategory)], {nonNullable: true});
    protected toDo: ToDo;
    protected toDoCategory = ToDoCategory;
    protected toDoCategoryDisplayNames = ToDoCategoryDisplayNames;
    protected readonly isBeta: boolean;
    private hadAllBefore = true;

    constructor(protected readonly toDoService: ToDoService, private readonly settings: SettingsService) {
        this.toDo = this.toDoService.getCurrentToDo();
        this.isBeta = this.settings.getSettings().useBeta;

        this.toDoCategoryControl.valueChanges.pipe(
            takeUntilDestroyed()
        ).subscribe({
            next: value => {
                const enumValues = Object.values(ToDoCategory);

                if (this.hadAllBefore && !value.includes('all')) {
                    this.toDoCategoryControl.setValue([], {emitEvent: false})
                    this.hadAllBefore = false;
                } else if (!this.hadAllBefore && value.includes('all')) {
                    this.toDoCategoryControl.setValue(['all', ...enumValues], {emitEvent: false});
                    this.hadAllBefore = true;
                } else if (this.hadAllBefore && value.length < (enumValues.length + 1)) {
                    this.toDoCategoryControl.setValue(value.filter(s => s !== 'all'), {emitEvent: false})
                    this.hadAllBefore = false;
                }

            }
        })
    }

}
