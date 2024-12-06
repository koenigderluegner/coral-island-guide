import { Component, inject } from '@angular/core';
import { UiIcon } from '@ci/data-types';
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-people',
    templateUrl: './npcs.component.html',
    standalone: false
})
export class NPCsComponent {
    uiIcons = UiIcon;
    isNPCListActive = false;
    router = inject(Router)

    constructor() {
        this.updateIsNPCListActive(this.router.url);
        this.router.events.pipe(
            takeUntilDestroyed(),
            filter((e): e is NavigationEnd => e instanceof NavigationEnd)
        ).subscribe({
            next: event => {
                this.updateIsNPCListActive(event.urlAfterRedirects)
            }
        })
    }

    updateIsNPCListActive(url: string): void {
        this.isNPCListActive = url.startsWith('/npcs/') && !url.includes('overview') && !url.includes('gifting')
    }


}
