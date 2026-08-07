import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,

    changeDetection: ChangeDetectionStrategy.Eager,
    host: {
        'class': 'app-card'
    }
})
export class CardComponent {
}
