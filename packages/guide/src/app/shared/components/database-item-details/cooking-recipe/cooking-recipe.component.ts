import { booleanAttribute, Component, inject, Input, input } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { CookingRecipe } from "@ci/data-types";
import { SharedModule } from "../../../shared.module";
import { AddSpacesToPascalCasePipe } from "../../../pipes/add-spaces-to-pascal-case.pipe";
import { DatabaseService } from "../../../services/database.service";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-cooking-recipe',
    imports: [CommonModule, SharedModule, AddSpacesToPascalCasePipe, RouterLink],
    templateUrl: './cooking-recipe.component.html'
})
export class CookingRecipeComponent {

   readonly  cookingRecipe = input.required<CookingRecipe>()
    readonly showUtensil = input(false, { transform: booleanAttribute });


    protected cookingUtensilMapping = inject(DatabaseService).getCookingUtensilMapping();
}
