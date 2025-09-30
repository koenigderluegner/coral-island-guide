import { Component, input } from '@angular/core';
import { AnimalProduceComponent } from "../animal-produce/animal-produce.component";
import { CookingRecipeComponent } from "../cooking-recipe/cooking-recipe.component";
import { CropComponent } from "../crop/crop.component";
import { FishComponent } from "../fish/fish.component";
import { InsectComponent } from "../insect/insect.component";
import { ProcessingComponent } from "../processing/processing.component";
import { ShopProcessingResultComponent } from "../shop-processing-result/shop-processing-result.component";
import { DatabaseItem } from "@ci/data-types";

@Component({
    selector: 'app-offering',
    imports: [AnimalProduceComponent, CookingRecipeComponent, CropComponent, FishComponent, InsectComponent, ProcessingComponent, ShopProcessingResultComponent],
    templateUrl: './offering.component.html',
    styles: `:host {
        display: flex;
        gap: 1rem;
        flex-direction: column;
    }`
})
export class OfferingComponent {
   readonly details = input.required<DatabaseItem>()
}
