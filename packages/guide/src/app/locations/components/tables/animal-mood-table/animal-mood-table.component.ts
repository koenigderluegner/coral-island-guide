import { Component, input } from '@angular/core';
import { ProductSizeByMood } from "@ci/data-types";
import { ResponsiveTableComponent } from "../../../../shared/components/responsive-table/responsive-table.component";
import { MatTableModule } from "@angular/material/table";
import { SlicePipe } from "@angular/common";

@Component({
    selector: 'app-animal-mood-table',
    templateUrl: './animal-mood-table.component.html',

    imports: [
        ResponsiveTableComponent,
        SlicePipe,
        MatTableModule
    ]
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
