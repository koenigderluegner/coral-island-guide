import { Component, Input } from '@angular/core';
import { Effect } from "@ci/data-types";

@Component({
    selector: 'app-effect',
    templateUrl: './effect.component.html',
})
export class EffectComponent {

    @Input({required: true}) effect!: Effect;
}
