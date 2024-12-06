import { Component, HostBinding, inject, ViewEncapsulation } from '@angular/core';
import { UiIcon } from "@ci/data-types";
import { GAME_VERSION } from "../../injection-tokens/version.injection-token";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styles: [`
        .app-footer footer {
            background-color: rgba(0, 0, 0, .75);
            min-height: var(--cg-min-footer-height);
        }
    `],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class FooterComponent {
    protected uiIcon = UiIcon;
    protected version = inject(GAME_VERSION);
    @HostBinding('class.app-footer') private _setCssClass = true;
}
