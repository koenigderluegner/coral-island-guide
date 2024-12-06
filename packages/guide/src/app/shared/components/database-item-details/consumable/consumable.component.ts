import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Consumable } from "@ci/data-types";
import { AddSpacesToPascalCasePipe } from "../../../pipes/add-spaces-to-pascal-case.pipe";

@Component({
    selector: 'app-consumable',
    imports: [CommonModule, AddSpacesToPascalCasePipe],
    templateUrl: './consumable.component.html'
})
export class ConsumableComponent {
    @Input({required: true}) consumable!: Consumable
}
