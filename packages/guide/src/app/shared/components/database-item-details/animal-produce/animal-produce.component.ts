import { booleanAttribute, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseItem } from "@ci/data-types";
import { AddSpacesToPascalCasePipe } from "../../../pipes/add-spaces-to-pascal-case.pipe";
import { ItemIconComponent } from "../../item-icon/item-icon.component";
import { IsMinimalItemPipe } from "../../../pipes/is-minimal-item.pipe";

@Component({
    selector: 'app-animal-produce',
    imports: [CommonModule, AddSpacesToPascalCasePipe, ItemIconComponent, IsMinimalItemPipe],
    templateUrl: './animal-produce.component.html'
})
export class AnimalProduceComponent {
    readonly animal = input.required<NonNullable<DatabaseItem['producedByAnimal']>>()
    readonly shownItemId = input<string>();
    readonly hideAnimal = input(false, {transform: booleanAttribute});

}
