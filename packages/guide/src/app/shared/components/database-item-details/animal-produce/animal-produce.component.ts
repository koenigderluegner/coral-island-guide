import { booleanAttribute, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseItem } from "@ci/data-types";
import { AddSpacesToPascalCasePipe } from "../../../pipes/add-spaces-to-pascal-case.pipe";
import { SharedModule } from "../../../shared.module";

@Component({
    selector: 'app-animal-produce',
    imports: [CommonModule, AddSpacesToPascalCasePipe, SharedModule],
    templateUrl: './animal-produce.component.html'
})
export class AnimalProduceComponent {
    @Input({required: true}) animal!: NonNullable<DatabaseItem['producedByAnimal']>;
    @Input() shownItemId?: string;
    @Input({transform: booleanAttribute}) hideAnimal = false;

    protected keyValueNoOrder(): number {
        return 0
    }
}
