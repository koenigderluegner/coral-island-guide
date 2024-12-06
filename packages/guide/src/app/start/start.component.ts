import { Component, HostBinding, inject, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HttpClient } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ChangelogService } from "../changelog/changelog.service";
import { MarkdownComponent } from "ngx-markdown";
import { MatButton } from "@angular/material/button";
import { GAME_VERSION } from "../core/injection-tokens/version.injection-token";

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    imports: [CommonModule, SharedModule, MatProgressSpinnerModule, MarkdownComponent],
    styles: [`
        .app-start {
            @apply container block mx-auto my-10;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class StartComponent {

    latestChangelog$ = inject(ChangelogService).getLatestChangelog()
    showWholeChangelog = signal<undefined | string>(undefined)
    isLoading = signal(false)
    protected version = inject(GAME_VERSION);
    markdown$ = inject(HttpClient).get(`CHANGELOG.md?v=${this.version}`, {responseType: 'text'})
    @HostBinding('class.app-start') private _setCssClass = true;

    loadChangelog() {
        this.isLoading.set(true);

        this.markdown$.subscribe({
            next: markdown => {
                this.isLoading.set(false);
                this.showWholeChangelog.set(markdown)
            },
            error: () => {
                this.isLoading.set(false)
            }
        })
    }
}
