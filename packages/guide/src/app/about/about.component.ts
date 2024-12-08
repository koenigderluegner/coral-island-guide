import { Component, ViewEncapsulation } from '@angular/core';
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
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'app-about'
    }
})
export class AboutComponent {
}
