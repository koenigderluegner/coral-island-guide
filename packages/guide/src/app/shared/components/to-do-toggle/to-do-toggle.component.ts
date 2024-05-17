import { Component, inject, Input } from '@angular/core';
import { ToDoContext } from "../../../core/types/to-do-context.type";
import { ToDoService } from "../../../core/services/to-do.service";
import { ItemEntry } from "../../types/item-entry.type";
import { Quality, UiIcon } from '@ci/data-types';
import { MatTooltip } from "@angular/material/tooltip";
import { SharedModule } from "../../shared.module";

@Component({
    selector: 'app-to-do-toggle',
    standalone: true,
    imports: [
        MatTooltip,
        SharedModule
    ],
    templateUrl: './to-do-toggle.component.html'
})
export class ToDoToggleComponent {
    @Input({required: true}) item!: ItemEntry;
    @Input() context?: ToDoContext | undefined;
    @Input() amount?: number;
    @Input() quality?: Quality;

    protected readonly UiIcon = UiIcon;
    protected readonly toDoService: ToDoService = inject(ToDoService)
}
