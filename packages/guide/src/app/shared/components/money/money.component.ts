import { Component, Input, numberAttribute } from '@angular/core';

@Component({
    selector: 'app-money',
    templateUrl: './money.component.html',
    styleUrls: ['./money.component.scss'],
    standalone: false
})
export class MoneyComponent {
    @Input({transform: numberAttribute, required: true}) amount!: number;
}
