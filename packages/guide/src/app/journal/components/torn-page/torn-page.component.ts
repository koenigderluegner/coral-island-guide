import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { TornPageData } from "@ci/data-types";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-torn-page',
    templateUrl: './torn-page.component.html',

    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        TranslatePipe
    ]
})
export class TornPageComponent {

    readonly tornPage = input.required<TornPageData>();

}
