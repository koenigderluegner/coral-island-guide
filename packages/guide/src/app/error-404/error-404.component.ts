import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ChangelogComponent } from '../changelog/changelog.component';
import { SharedModule } from '../shared/shared.module';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-error-404',
    imports: [
        AsyncPipe,
        ChangelogComponent,
        SharedModule,
        RouterLink
    ],
    templateUrl: './error-404.component.html',
    styles: [`
        .app-error {
            @apply container mx-auto my-10 block;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class Error404Component {
    @HostBinding('class.app-error') private _setCssClass = true;
}
