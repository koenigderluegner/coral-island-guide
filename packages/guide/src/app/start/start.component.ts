import { Component, HostBinding, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangelogComponent } from '../changelog/changelog.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClient } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { delay } from "rxjs";

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    standalone: true,
    imports: [CommonModule, ChangelogComponent, SharedModule, MatProgressSpinnerModule],

    styles: [`
        .app-start {
            @apply container block mx-auto my-10;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class StartComponent {

    markdown$ = inject(HttpClient).get('CHANGELOG.md', {responseType: 'text'}).pipe(delay(20000))
    @HostBinding('class.app-start') private _setCssClass = true;

}
