import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { UiIcon } from '../../enums/ui-icon.enum';

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
