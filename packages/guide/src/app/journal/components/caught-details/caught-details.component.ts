import { Component, effect, input } from '@angular/core';
import { Critter, Fish } from '@ci/data-types';
import { ToDoContext } from "../../../core/types/to-do-context.type";
import { InsectComponent } from "../../../shared/components/database-item-details/insect/insect.component";
import { FishComponent } from "../../../shared/components/database-item-details/fish/fish.component";
import { DatabaseItemDetailsComponent } from "../../../shared/components/database-item-details/database-item-details.component";
import { DatabaseItemDetailsDirective } from "../../../shared/directives/database-item-details.directive";

@Component({
    selector: 'app-caught-details',
    templateUrl: './caught-details.component.html',

    imports: [
        InsectComponent,
        FishComponent,
        DatabaseItemDetailsComponent,
        DatabaseItemDetailsDirective
    ]
})
export class CaughtDetailsComponent {
    readonly critter = input.required<Fish | Critter>();

    protected toDoContext!: ToDoContext;

    constructor() {
        effect(() => {
            this.critter();
            this.#setCategory()
        });
    }


    #setCategory() {
        const critter = this.critter();
        this.toDoContext = 'fishName' in critter
            ? "journal_fish"
            : critter.item.inventoryCategory.toLocaleLowerCase() === 'bug'
                ? "journal_insects"
                : "journal_critter"
    }
}
