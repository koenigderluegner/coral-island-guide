import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { UiIcon } from '@ci/data-types';

@Component({
    selector: 'app-ui-icon',
    templateUrl: './ui-icon.component.html',
    styleUrls: ['./ui-icon.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiIconComponent {

    @HostBinding('class.app-ui-icon') private _setClass = true;
    @Input() uiIcon?: UiIcon;

}
