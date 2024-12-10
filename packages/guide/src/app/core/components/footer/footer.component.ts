import { Component, inject, ViewEncapsulation } from '@angular/core';
import { UiIcon } from "@ci/data-types";
import { GameVersionService } from "../../injection-tokens/version.injection-token";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styles: [`
        .app-footer footer {
            background-color: rgba(0, 0, 0, .75);
            min-height: var(--cg-min-footer-height);
        }
    `],
    host: {
        'class': 'app-footer'
    },
    encapsulation: ViewEncapsulation.None,
    imports: [
        UiIconComponent,
        RouterLink
    ]
})
export class FooterComponent {
    protected uiIcon = UiIcon;
    protected version = inject(GameVersionService).value();
}
