import { Component, Input } from '@angular/core';
import { ProductSizeByMood } from "@ci/data-types";

@Component({
    selector: 'app-animal-mood-table',
    templateUrl: './animal-mood-table.component.html',
})
export class AnimalMoodTableComponent {

    @Input({required: true}) productSizeByMood!: ProductSizeByMood[]
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
