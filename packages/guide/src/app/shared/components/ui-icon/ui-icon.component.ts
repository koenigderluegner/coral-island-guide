import { Component, HostBinding, inject, input, ViewEncapsulation } from '@angular/core';
import { UiIcon } from '@ci/data-types';
import { GAME_VERSION } from "../../../core/injection-tokens/version.injection-token";

@Component({
    selector: 'app-ui-icon',
    templateUrl: './ui-icon.component.html',
    styleUrls: ['./ui-icon.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: []
})
export class UiIconComponent {

    protected version = inject(GAME_VERSION);
    uiIcon = input.required<UiIcon>();
    @HostBinding('class.app-ui-icon') private _setClass = true;

}
