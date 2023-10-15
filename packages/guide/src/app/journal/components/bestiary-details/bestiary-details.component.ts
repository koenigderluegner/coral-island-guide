import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Enemy } from "@ci/data-types";

@Component({
    selector: 'app-bestiary-details',
    templateUrl: './bestiary-details.component.html',
    styleUrls: ['./bestiary-details.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class BestiaryDetailsComponent {

    @Input({required: true}) enemy!: Enemy

}
