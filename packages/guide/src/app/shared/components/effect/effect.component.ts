import { Component, Input } from '@angular/core';
import { Effect, MinimalItem, RemoveItemFromInventoryEffect } from "@ci/data-types";

@Component({
    selector: 'app-effect',
    templateUrl: './effect.component.html',
    standalone: false
})
export class EffectComponent {

    @Input({required: true}) effect!: Effect;

    hasMinimalItem(effectMeta: RemoveItemFromInventoryEffect["meta"]): effectMeta is {
        item: MinimalItem,
        amount: number;
    } {
        return 'item' in effectMeta
    }
}
