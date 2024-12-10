import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { UiIcon } from '@ci/data-types';
import { GameVersionService } from "../../../core/injection-tokens/version.injection-token";

@Component({
    selector: 'app-ui-icon',
    templateUrl: './ui-icon.component.html',
    styleUrls: ['./ui-icon.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'app-ui-icon'
    }
})
export class UiIconComponent {
    readonly uiIcon = input.required<UiIcon>();
    protected readonly version = inject(GameVersionService).value();
}
