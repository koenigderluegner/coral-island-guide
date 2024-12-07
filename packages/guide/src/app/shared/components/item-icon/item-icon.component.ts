import { Component, HostBinding, inject, Input, numberAttribute, ViewEncapsulation, input } from '@angular/core';
import { Quality } from '@ci/data-types';
import { SettingsService } from '../../services/settings.service';
import { GAME_VERSION } from "../../../core/injection-tokens/version.injection-token";

@Component({
    selector: 'app-item-icon',
    templateUrl: './item-icon.component.html',
    styleUrls: ['./item-icon.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ItemIconComponent {
    readonly itemName = input<string | null>();
   readonly subIconName = input<string | null>();
  readonly quality = input< Quality>();
 readonly amount = input(0, {transform: numberAttribute});
    protected environment = inject(SettingsService).getSettings().useBeta ? 'beta' : 'live';
    protected version = inject(GAME_VERSION);
    @HostBinding('class.app-item-icon') private _setClass = true;

}
