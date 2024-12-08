import { Component, input } from '@angular/core';
import { Effect, MinimalItem, RemoveItemFromInventoryEffect } from "@ci/data-types";
import { ItemIconComponent } from "../item-icon/item-icon.component";
import { MoneyComponent } from "../money/money.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-effect',
    templateUrl: './effect.component.html',

    imports: [
        ItemIconComponent,
        MoneyComponent,
        RouterLink
    ]
})
export class EffectComponent {

    readonly effect = input.required<Effect>();

    hasMinimalItem(effectMeta: RemoveItemFromInventoryEffect["meta"]): effectMeta is {
        item: MinimalItem,
        amount: number;
    } {
        return 'item' in effectMeta
    }
}
