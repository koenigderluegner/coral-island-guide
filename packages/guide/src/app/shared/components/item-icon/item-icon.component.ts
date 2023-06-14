import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Quality } from '@ci/data-types';
import { coerceNumberProperty } from "@angular/cdk/coercion";
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
    _amount = 0;
    protected version: string;
    @HostBinding('class.app-item-icon') private _setClass = true;

    constructor(private readonly _settings: SettingsService) {
        this.version = this._settings.getSettings().useBeta ? 'beta' : 'live';
    }

    @Input()
    get amount(): number {
        return this._amount;
    }

    set amount(size: boolean | number | string | null | undefined) {
        this._amount = coerceNumberProperty(size);
    }

}
