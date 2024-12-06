import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    imports: [CommonModule, SharedModule],
    styles: [`
        .app-about {
            @apply container block mx-auto my-10;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class AboutComponent {

    @HostBinding('class.app-about') private _setCssClass = true;

}
