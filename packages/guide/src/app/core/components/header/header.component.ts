import { Component, inject, ViewEncapsulation } from '@angular/core';
import { UiIcon } from '@ci/data-types';
import { NavigationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { SettingsService } from '../../../shared/services/settings.service';
import { CdkConnectedOverlay, CdkOverlayOrigin } from "@angular/cdk/overlay";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";

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
    imports: [
        CdkConnectedOverlay,
        RouterLinkActive,
        RouterLink,
        UiIconComponent,
        CdkOverlayOrigin
    ],

    host: {
        '[class.open-menu]': 'isOpen',
        'class': 'app-header'
    }
})
export class HeaderComponent {
    naviLinks: NaviLinks = [
        {
            text: 'Journal',
            uiIcon: UiIcon.JOURNAL,
            path: 'journal/produce/crops',
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
    isOpen = false;
    protected uiIcon = UiIcon;
    protected readonly isBeta = inject(SettingsService).getSettings().useBeta;
    readonly #router = inject(Router);

    constructor() {
        this.#router.events.pipe(filter((e) => e instanceof NavigationStart)).subscribe(() => {
            this.isOpen = false;
        });

    }
}
