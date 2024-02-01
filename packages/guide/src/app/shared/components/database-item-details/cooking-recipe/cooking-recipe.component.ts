import { booleanAttribute, Component, inject, Input } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { CookingRecipe } from "@ci/data-types";
import { SharedModule } from "../../../shared.module";
import { AddSpacesToPascalCasePipe } from "../../../pipes/add-spaces-to-pascal-case.pipe";
import { DatabaseService } from "../../../services/database.service";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-cooking-recipe',
    standalone: true,
    imports: [CommonModule, SharedModule, JsonPipe, AddSpacesToPascalCasePipe, RouterLink],
    templateUrl: './cooking-recipe.component.html'
})
export class CookingRecipeComponent {
    @Input({required: true}) cookingRecipe!: CookingRecipe
    @Input({transform: booleanAttribute}) showUtensil = false


    protected cookingUtensilMapping = inject(DatabaseService).getCookingUtensilMapping();
}
