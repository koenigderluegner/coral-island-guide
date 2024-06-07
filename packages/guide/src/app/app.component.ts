import { Component, inject } from '@angular/core';
import { DatabaseService } from './shared/services/database.service';
import { combineLatest, Observable } from 'rxjs';
import { ChangelogService } from "./changelog/changelog.service";
import { MatDialog } from "@angular/material/dialog";
import { ChangelogDialogComponent } from "./changelog/changelog-dialog/changelog-dialog.component";
import { SettingsService } from "./shared/services/settings.service";
import { UserDataService } from "./core/services/user-data.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    prefetchData$: Observable<any>;
    #databaseService = inject(DatabaseService)
    #changelogService = inject(ChangelogService)
    #dialog = inject(MatDialog);
    #settingsService = inject(SettingsService);


    constructor() {
        inject(UserDataService).read();

        if (!this.#settingsService.getSettings().disableChangelogs) {
            this.#changelogService.getLatestChangelog().subscribe({
                next: changelog => {

                    if (changelog.version === this.#changelogService.getLatestSeen()) return;

                    const dialogRef = this.#dialog.open(ChangelogDialogComponent, {
                        data: {changelog},
                        hasBackdrop: true,
                        width: '800px'
                    });

                    dialogRef.afterClosed().subscribe({
                        next: () => {
                            this.#changelogService.setLatestSeen(changelog)
                        }
                    })
                }
            })
        }

        this.prefetchData$ = combineLatest([
            this.#databaseService.fetchItems$(),
            this.#databaseService.fetchTagBasedItems$(),
            this.#databaseService.fetchProcessorMapping$(),
            this.#databaseService.fetchCookingUtensilMapping$(),
        ]);
    }

}
