import { Component, Input } from '@angular/core';
import { TornPageData } from "@ci/data-types";

@Component({
    selector: 'app-torn-page',
    templateUrl: './torn-page.component.html',
    standalone: false
})
export class TornPageComponent {

    @Input({required: true}) tornPage!: TornPageData

}
