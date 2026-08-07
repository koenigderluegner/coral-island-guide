import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Quality } from '@ci/data-types';
import { TitleCasePipe } from "@angular/common";

@Component({
    selector: 'app-rarity-icon',
    templateUrl: './rarity-icon.component.html',
    styleUrls: ['./rarity-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        TitleCasePipe
    ]
})
// TODO rename to quality
export class RarityIconComponent {

    QUALITY = Quality;
    readonly quality = input<Quality>();
}
