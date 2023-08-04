import { Component, HostBinding, Input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { Quality } from '@ci/data-types';
import { SettingsService } from "../../services/settings.service";

@Component({
    selector: 'app-item-icon',
    templateUrl: './item-icon.component.html',
    styleUrls: ['./item-icon.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ItemIconComponent {

    @Input() itemName?: string | null | undefined;
    @Input() subIconName?: string | null;
    @Input() quality?: Quality | undefined;
    @Input({transform: numberAttribute}) amount = 0;
    protected version: string;
    @HostBinding('class.app-item-icon') private _setClass = true;

    constructor(private readonly _settings: SettingsService) {
        this.version = this._settings.getSettings().useBeta ? 'beta' : 'live';
    }

}
