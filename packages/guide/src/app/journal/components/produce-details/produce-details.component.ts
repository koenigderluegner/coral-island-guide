import { Component, input, Input } from '@angular/core';
import { Crop, FruitPlant, FruitTree, MinimalItem } from '@ci/data-types';
import { ToDoContext } from "../../../core/types/to-do-context.type";

@Component({
    selector: 'app-produce-details',
    templateUrl: './produce-details.component.html',
})
export class ProduceDetailsComponent {
    @Input({required: true}) item!: MinimalItem | Crop | FruitPlant | FruitTree;
    toDoContext = input.required<ToDoContext | undefined>()

}
