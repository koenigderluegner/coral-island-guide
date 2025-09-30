import { Component, input } from '@angular/core';
import { Consumable } from "@ci/data-types";
import { AddSpacesToPascalCasePipe } from "../../../pipes/add-spaces-to-pascal-case.pipe";

@Component({
    selector: 'app-consumable',
    imports: [AddSpacesToPascalCasePipe],
    templateUrl: './consumable.component.html'
})
export class ConsumableComponent {

    readonly consumable = input.required<Consumable>();
}
