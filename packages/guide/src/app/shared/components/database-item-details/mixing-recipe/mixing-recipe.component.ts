import { Component, input } from '@angular/core';
import { ItemMixingRecipeData } from "@ci/data-types";
import { AddSpacesToPascalCasePipe } from "../../../pipes/add-spaces-to-pascal-case.pipe";
import { KeyValuePipe, TitleCasePipe } from "@angular/common";
import { SharedModule } from "../../../shared.module";

@Component({
    selector: 'app-mixing-recipe',
    standalone: true,
    imports: [
        AddSpacesToPascalCasePipe,
        KeyValuePipe,
        SharedModule,
        TitleCasePipe
    ],
    templateUrl: './mixing-recipe.component.html'
})
export class MixingRecipeComponent {
    mixingRecipe = input.required<ItemMixingRecipeData>()
}
