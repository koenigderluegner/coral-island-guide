import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-money',
    templateUrl: './money.component.html',
    styleUrls: ['./money.component.scss'],
})
export class MoneyComponent {
    @Input() amount?: number | null;
}
