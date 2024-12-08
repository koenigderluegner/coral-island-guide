import { Component, input } from '@angular/core';
import { Crop, FruitPlant, FruitTree, MinimalItem } from '@ci/data-types';
import { ToDoContext } from "../../../core/types/to-do-context.type";
import { ProcessingComponent } from "../../../shared/components/database-item-details/processing/processing.component";
import { AnimalProduceComponent } from "../../../shared/components/database-item-details/animal-produce/animal-produce.component";
import { CropComponent } from "../../../shared/components/database-item-details/crop/crop.component";
import { DatabaseItemDetailsComponent } from "../../../shared/components/database-item-details/database-item-details.component";
import { DatabaseItemDetailsDirective } from "../../../shared/directives/database-item-details.directive";
import { IsBaseCropPipe } from "../../../shared/pipes/is-base-crop.pipe";

@Component({
    selector: 'app-produce-details',
    templateUrl: './produce-details.component.html',

    imports: [
        ProcessingComponent,
        AnimalProduceComponent,
        CropComponent,
        DatabaseItemDetailsComponent,
        DatabaseItemDetailsDirective,
        IsBaseCropPipe
    ]
})
export class ProduceDetailsComponent {
    readonly item = input.required<MinimalItem | Crop | FruitPlant | FruitTree>();
    readonly toDoContext = input.required<ToDoContext | undefined>()

}
