import { Component, Input } from '@angular/core';
import { TornPageData } from "@ci/data-types";

@Component({
    selector: 'app-torn-page-details',
    templateUrl: './torn-page-details.component.html',
})
export class TornPageDetailsComponent {
    @Input({required: true}) tornPage!: TornPageData

}
