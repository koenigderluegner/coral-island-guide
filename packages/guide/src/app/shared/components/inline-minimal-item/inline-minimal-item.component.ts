import { Component, input, ViewEncapsulation } from '@angular/core';
import { MinimalItem } from '@ci/data-types';

@Component({
    selector: 'app-inline-minimal-item',
    templateUrl: './inline-minimal-item.component.html',
    styleUrls: ['./inline-minimal-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false,
    host: {
        'class': 'app-inline-minimal-item'
    }
})
export class InlineMinimalItemComponent {
    readonly minimalItem = input.required<MinimalItem>();
}
