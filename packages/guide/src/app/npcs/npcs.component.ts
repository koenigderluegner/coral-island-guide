import { Component, inject } from '@angular/core';
import { UiIcon } from '@ci/data-types';
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { filter } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ModuleSidebarItemComponent } from "../shared/components/module-sidebar-item/module-sidebar-item.component";
import { ModuleSidebarComponent } from "../shared/components/module-sidebar/module-sidebar.component";
import { SidebarContainerComponent } from "../shared/components/sidebar-container/sidebar-container.component";

@Component({
    selector: 'app-people',
    templateUrl: './npcs.component.html',

    imports: [
        RouterOutlet,
        ModuleSidebarItemComponent,
        ModuleSidebarComponent,
        SidebarContainerComponent
    ]
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
