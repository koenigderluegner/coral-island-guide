import { Component, Input } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { CookingRecipe } from "@ci/data-types";
import { SharedModule } from "../../../shared.module";

@Component({
    selector: 'app-cooking-recipe',
    standalone: true,
    imports: [CommonModule, SharedModule, JsonPipe],
    templateUrl: './cooking-recipe.component.html'
})
export class CookingRecipeComponent {
    @Input({required: true}) cookingRecipe!: CookingRecipe
}
