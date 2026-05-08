import { Component, input } from '@angular/core';
import { Consumable, DatabaseItem } from "@ci/data-types";
import { AddSpacesToPascalCasePipe } from "../../../pipes/add-spaces-to-pascal-case.pipe";
import { TranslatePipe } from "@ngx-translate/core";
import { RouterLink } from "@angular/router";
import { MoneyComponent } from "../../money/money.component";

@Component({
    selector: 'app-buy-at',
    imports: [AddSpacesToPascalCasePipe, TranslatePipe, RouterLink, MoneyComponent],
    templateUrl: './buy-at.component.html'
})
export class BuyAtComponent {

    readonly buyAt = input.required<DatabaseItem['buyAt']>();
}
