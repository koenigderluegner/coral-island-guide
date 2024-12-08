import { Component, input } from '@angular/core';
import { ItemMixingRecipeData } from "@ci/data-types";
import { AddSpacesToPascalCasePipe } from "../../../pipes/add-spaces-to-pascal-case.pipe";
import { KeyValuePipe, TitleCasePipe } from "@angular/common";
import { SharedModule } from "../../../shared.module";

@Component({
    selector: 'app-mixing-recipe',
    imports: [
        KeyValuePipe,
        SharedModule,
    ],
    templateUrl: './mixing-recipe.component.html'
})
export class MixingRecipeComponent {
    mixingRecipe = input.required<ItemMixingRecipeData>()
}
