import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,

    host: {
        'class': 'app-card'
    }
})
export class CardComponent {
}
