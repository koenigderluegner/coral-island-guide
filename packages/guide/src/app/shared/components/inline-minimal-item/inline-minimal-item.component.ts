import { Component, HostBinding, input, ViewEncapsulation } from '@angular/core';
import { MinimalItem } from '@ci/data-types';

@Component({
    selector: 'app-inline-minimal-item',
    templateUrl: './inline-minimal-item.component.html',
    styleUrls: ['./inline-minimal-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InlineMinimalItemComponent {
    minimalItem = input.required<MinimalItem>();
    @HostBinding('class.app-inline-minimal-item') private _setClass = true;
}
