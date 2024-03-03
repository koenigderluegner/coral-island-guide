import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    standalone: true,
    imports: [CommonModule, AnimalProduceComponent, CookingRecipeComponent, CropComponent, FishComponent, InsectComponent, ProcessingComponent, ShopProcessingResultComponent],
    templateUrl: './offering.component.html'
})
export class OfferingComponent {
    @Input({required: true}) details!: DatabaseItem
}
