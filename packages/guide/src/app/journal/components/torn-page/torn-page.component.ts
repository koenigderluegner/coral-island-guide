import { Component, input } from '@angular/core';
import { TornPageData } from "@ci/data-types";

@Component({
    selector: 'app-torn-page',
    templateUrl: './torn-page.component.html',

})
export class TornPageComponent {

    readonly tornPage = input.required<TornPageData>();

}
