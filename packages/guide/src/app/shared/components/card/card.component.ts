import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class CardComponent {
    @HostBinding('class.app-card') private _setClass = true;

}
