import { booleanAttribute, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemProcessing } from "@ci/data-types";
import { DatabaseService } from "../../../services/database.service";
import { AddSpacesToPascalCasePipe } from "../../../pipes/add-spaces-to-pascal-case.pipe";
import { RouterLink } from "@angular/router";
import { RefinementsListComponent } from "../../refinements-list/refinements-list.component";
import { ProcessingTimePerQualityComponent } from "../../processing-time-per-quality/processing-time-per-quality.component";
import { ItemListComponent } from "../../item-list/item-list.component";
import { ItemProcessingIngredientsPipe } from "../../../pipes/item-processing-ingredients.pipe";
import { ProcessingTimeComponent } from "../../processing-time/processing-time.component";
import { ItemIconComponent } from "../../item-icon/item-icon.component";

@Component({
    selector: 'app-processing',
    imports: [
        CommonModule,
        AddSpacesToPascalCasePipe,
        RouterLink,
        RefinementsListComponent,
        ProcessingTimePerQualityComponent,
        ItemListComponent,
        ItemProcessingIngredientsPipe,
        ProcessingTimeComponent,
        ItemIconComponent
    ],
    templateUrl: './processing.component.html'
})
export class ProcessingComponent {
    readonly itemProcessing = input.required<ItemProcessing>();
    readonly hideMaschine = input(false, {transform: booleanAttribute});
    protected processorMapping = inject(DatabaseService).getProcessorMapping();

}
