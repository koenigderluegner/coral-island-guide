import { Component, HostBinding, input, ViewEncapsulation } from '@angular/core';
import { UiIcon } from '@ci/data-types';

@Component({
    selector: 'app-ui-icon',
    templateUrl: './ui-icon.component.html',
    styleUrls: ['./ui-icon.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: []
})
export class UiIconComponent {

    uiIcon = input.required<UiIcon>();
    @HostBinding('class.app-ui-icon') private _setClass = true;

}
