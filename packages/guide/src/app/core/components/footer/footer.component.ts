import { Component, HostBinding, inject, ViewEncapsulation } from '@angular/core';
import { UiIcon } from "@ci/data-types";
import { VersionService } from "../../services/version.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styles: [`
        .app-footer footer {
            background-color: rgba(0, 0, 0, .75);
            min-height: var(--cg-min-footer-height);
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
    protected uiIcon = UiIcon;
    @HostBinding('class.app-footer') private _setCssClass = true;
    protected version$ = inject(VersionService).get()
}
