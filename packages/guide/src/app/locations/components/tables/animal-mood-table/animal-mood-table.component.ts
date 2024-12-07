import { Component, input } from '@angular/core';
import { ProductSizeByMood } from "@ci/data-types";

@Component({
    selector: 'app-animal-mood-table',
    templateUrl: './animal-mood-table.component.html',
    standalone: false
})
export class AnimalMoodTableComponent {

    readonly productSizeByMood = input.required<ProductSizeByMood[]>();
    protected displayHeaderColumns: string[] = [
        'hearts',
        'badSmall',
        'badLarge',
        'neutralSmall',
        'neutralLarge',
        'happySmall',
        'happyLarge'
    ]


}
