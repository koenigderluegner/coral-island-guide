import { Component, input } from '@angular/core';
import { Effect, EffectMetaForType, MinimalItem } from '@ci/data-types';
import { ItemIconComponent } from '../item-icon/item-icon.component';
import { MoneyComponent } from '../money/money.component';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-effect',
    templateUrl: './effect.component.html',
    imports: [ItemIconComponent, MoneyComponent, RouterLink, TranslatePipe],
})
export class EffectComponent {
    readonly effect = input.required<Effect>();

    hasMinimalItem(effectMeta: EffectMetaForType<'RemoveItemFromInventory'>): effectMeta is {
        item: MinimalItem;
        amount: number;
    } {
        return 'item' in effectMeta;
    }
}
