import { afterNextRender, Component, inject } from '@angular/core';
import { DatabaseService } from './shared/services/database.service';
import { combineLatest } from 'rxjs';
import { ChangelogService } from "./changelog/changelog.service";
import { MatDialog } from "@angular/material/dialog";
import { ChangelogDialogComponent } from "./changelog/changelog-dialog/changelog-dialog.component";
import { SettingsService } from "./shared/services/settings.service";
import { UserDataService } from "./core/services/user-data.service";
import { HeaderComponent } from "./core/components/header/header.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./core/components/footer/footer.component";
import { TranslateService } from "@ngx-translate/core";
import { AvailableLanguage, AvailableLanguages } from "@ci/data-types";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        HeaderComponent,
        RouterOutlet,
        FooterComponent
    ]
})
export class AppComponent {

    constructor() {
        const usedLang: AvailableLanguage = 'en'
        const translate = inject(TranslateService);
        translate.addLangs([...AvailableLanguages]);
        translate.setFallbackLang(usedLang);
        translate.use(usedLang);
        inject(UserDataService).read();
        const changelogService = inject(ChangelogService);
        if (!inject(SettingsService).getSettings().disableChangelogs) {
            afterNextRender(() => {
                changelogService.getLatestChangelog().subscribe({
                    next: changelog => {

                        if (changelog.version === changelogService.getLatestSeen()) return;

                        const dialogRef = inject(MatDialog).open(ChangelogDialogComponent, {
                            data: {changelog},
                            hasBackdrop: true,
                            width: '800px'
                        });

                        dialogRef.afterClosed().subscribe({
                            next: () => {
                                changelogService.setLatestSeen(changelog)
                            }
                        })
                    }
                })
            })
        }

    }

}
