import { Component, input } from '@angular/core';
import { Crop, FruitPlant, FruitTree, MinimalItem } from '@ci/data-types';
import { ToDoContext } from "../../../core/types/to-do-context.type";

@Component({
    selector: 'app-produce-details',
    templateUrl: './produce-details.component.html',
    standalone: false
})
export class ProduceDetailsComponent {
    readonly item = input.required<MinimalItem | Crop | FruitPlant | FruitTree>();
    readonly toDoContext = input.required<ToDoContext | undefined>()

}
