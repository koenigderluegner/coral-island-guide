import { Component, inject } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from "@angular/material/dialog";
import { LatestChangelog } from "../latest-changelog.type";
import { MarkdownComponent } from "ngx-markdown";
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox";
import { SettingsService } from "../../shared/services/settings.service";

@Component({
    selector: 'app-changelog-dialog',
    imports: [
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,
        MarkdownComponent,
        MatCheckbox
    ],
    templateUrl: './changelog-dialog.component.html',
    styles: `
        :host {
            --mat-dialog-subhead-weight: 700;
            --mat-dialog-subhead-size: 1.5rem;
            --mat-dialog-subhead-line-height: 1.8rem;

        }`
})
export class ChangelogDialogComponent {
    dialogData = inject<{ changelog: LatestChangelog }>(MAT_DIALOG_DATA);

    #settingsService = inject(SettingsService)

    toggleDisableChangelog($event: MatCheckboxChange) {
        this.#settingsService.saveSettings({...this.#settingsService.getSettings(), disableChangelogs: $event.checked})
    }
}
