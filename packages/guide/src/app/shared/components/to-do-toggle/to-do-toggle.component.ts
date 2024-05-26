import { Component, inject, input } from '@angular/core';
import { ToDoContext } from "../../../core/types/to-do-context.type";
import { ToDoService } from "../../../core/services/to-do.service";
import { ItemEntry } from "../../types/item-entry.type";
import { Quality, UiIcon } from '@ci/data-types';
import { MatTooltip } from "@angular/material/tooltip";
import { UiIconComponent } from "../ui-icon/ui-icon.component";

@Component({
    selector: 'app-to-do-toggle',
    standalone: true,
    imports: [
        MatTooltip,
        UiIconComponent,
    ],
    templateUrl: './to-do-toggle.component.html'
})
export class ToDoToggleComponent {
    item = input.required<ItemEntry>();
    context = input<ToDoContext>();
    amount = input<number>();
    quality = input<Quality>();

    protected readonly UiIcon = UiIcon;
    protected readonly toDoService: ToDoService = inject(ToDoService)
}
