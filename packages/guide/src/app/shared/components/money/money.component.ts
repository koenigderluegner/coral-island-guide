import { Component, input, numberAttribute } from '@angular/core';
import { DecimalPipe } from "@angular/common";

@Component({
    selector: 'app-money',
    templateUrl: './money.component.html',
    styleUrls: ['./money.component.scss'],

    imports: [
        DecimalPipe
    ]
})
export class MoneyComponent {
    readonly amount = input.required<number, unknown>({transform: numberAttribute});
}
