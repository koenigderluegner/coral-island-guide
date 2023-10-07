import { Component, Input } from '@angular/core';
import { ToDoService } from "../core/services/to-do.service";
import { ToDo } from "../core/interfaces/todo.interface";
import { animate, style, transition, trigger } from "@angular/animations";
import { SettingsService } from "../shared/services/settings.service";
import { ToDoCategory } from "../core/enums/todo-category.enum";

@Component({
    selector: 'app-to-do',
    templateUrl: './to-do.component.html',
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

    @Input() toDoId?: string;

    protected toDo: ToDo;
    protected toDoCategory = ToDoCategory;
    protected readonly isBeta: boolean;

    constructor(protected readonly toDoService: ToDoService, private readonly settings: SettingsService) {
        this.toDo = this.toDoService.getCurrentToDo();
        this.isBeta = this.settings.getSettings().useBeta;
    }

}
