import { Component, inject, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { Quality } from '@ci/data-types';
import { SettingsService } from '../../services/settings.service';
import { GameVersionService } from "../../../core/injection-tokens/version.injection-token";
import { RarityIconComponent } from "../rarity-icon/rarity-icon.component";

@Component({
    selector: 'app-item-icon',
    templateUrl: './item-icon.component.html',
    styleUrls: ['./item-icon.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        RarityIconComponent
    ],

    host: {
        'class': 'app-item-icon'
    }
})
export class ItemIconComponent {
    readonly itemName = input<string | null>();
    readonly subIconName = input<string | null>();
    readonly quality = input<Quality>();
    readonly amount = input(0, {transform: numberAttribute});
    protected environment = inject(SettingsService).getSettings().useBeta ? 'beta' : 'live';
    protected version = inject(GameVersionService).value();

}
