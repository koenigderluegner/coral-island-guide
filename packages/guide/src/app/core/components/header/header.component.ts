import { Component, HostBinding, ViewEncapsulation, inject } from '@angular/core';
import { UiIcon } from '@ci/data-types';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { SettingsService } from '../../../shared/services/settings.service';

type NaviLinks = {
    path: RouterLink['routerLink'];
    uiIcon: UiIcon;
    text: string;
}[];

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
    private readonly _router = inject(Router);
    private readonly _settingsService = inject(SettingsService);
    naviLinks: NaviLinks = [
        {
            text: 'Journal',
            uiIcon: UiIcon.JOURNAL,
            path: 'journal',
        },
        {
            text: 'Crafting',
            uiIcon: UiIcon.CRAFTING,
            path: 'crafting',
        },
        {
            text: 'NPCs',
            uiIcon: UiIcon.PEOPLE,
            path: 'npcs',
        },
        {
            text: 'Locations',
            uiIcon: UiIcon.MAP,
            path: 'locations',
        },
        {
            text: 'My Guide',
            uiIcon: UiIcon.MY_CORAL,
            path: 'my',
        },
        {
            text: 'Item database',
            uiIcon: UiIcon.DATABASE,
            path: 'database',
        },
    ];
    @HostBinding('class.open-menu') isOpen = false;
    protected uiIcon = UiIcon;
    protected isBeta = false;
    @HostBinding('class.app-header') private _setClass = true;

    constructor() {
        this._router.events.pipe(filter((e) => e instanceof NavigationStart)).subscribe(() => {
            this.isOpen = false;
        });

        this.isBeta = this._settingsService.getSettings().useBeta;
    }
}
