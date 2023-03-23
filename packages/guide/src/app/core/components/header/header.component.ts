import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { UiIcon } from '../../../shared/enums/ui-icon.enum';
import { NavigationStart, Router, RouterEvent, RouterLink } from '@angular/router';
import { filter } from "rxjs";

type NaviLinks = {
    path: RouterLink['routerLink'];
    uiIcon: UiIcon;
    text: string;
}[];

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

    naviLinks: NaviLinks = [
        {
            text: 'Journal',
            uiIcon: UiIcon.JOURNAL,
            path: 'journal'
        }, {
            text: 'Crafting',
            uiIcon: UiIcon.CRAFTING,
            path: 'crafting'
        }, {
            text: 'People',
            uiIcon: UiIcon.PEOPLE,
            path: 'people'
        }, {
            text: 'Item database',
            uiIcon: UiIcon.DATABASE,
            path: 'database'
        },
    ];
    @HostBinding('class.open-menu') isOpen = false;
    protected uiIcon = UiIcon;
    @HostBinding('class.app-header') private _setClass = true;

    constructor(private _router: Router) {
        _router.events.pipe(
            filter((e): e is RouterEvent => e instanceof NavigationStart)
        ).subscribe(() => {
            this.isOpen = false;
        });
    }

}
