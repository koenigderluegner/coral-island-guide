import { Component, Input } from '@angular/core';
import { Quality } from '@ci/data-types';

@Component({
    selector: 'app-rarity-icon',
    templateUrl: './rarity-icon.component.html',
    styleUrls: ['./rarity-icon.component.scss'],
})
// TODO rename to quality
export class RarityIconComponent {

    QUALITY = Quality;
    @Input() quality?: Quality;
}
