import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HttpClient } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ChangelogService } from "../changelog/changelog.service";
import { MarkdownComponent } from "ngx-markdown";
import { GAME_VERSION } from "../core/injection-tokens/version.injection-token";

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    imports: [CommonModule, SharedModule, MatProgressSpinnerModule, MarkdownComponent],
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'app-start container block mx-auto my-10'
    }
})
export class StartComponent {

    latestChangelog$ = inject(ChangelogService).getLatestChangelog()
    showWholeChangelog = signal<undefined | string>(undefined)
    isLoading = signal(false)
    protected version = inject(GAME_VERSION);
    markdown$ = inject(HttpClient).get(`CHANGELOG.md?v=${this.version}`, {responseType: 'text'})

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
