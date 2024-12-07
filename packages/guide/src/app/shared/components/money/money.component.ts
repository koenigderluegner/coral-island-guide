import { Component, numberAttribute, input } from '@angular/core';

@Component({
    selector: 'app-money',
    templateUrl: './money.component.html',
    styleUrls: ['./money.component.scss'],
    standalone: false
})
export class MoneyComponent {
    readonly amount = input.required<number, unknown>({ transform: numberAttribute });
}
