import { Component, inject } from '@angular/core';
import { BaseSelectableContainerComponent } from "../base-selectable-container/base-selectable-container.component";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { take, tap } from "rxjs";

@Component({
    template: '',
})
export class BaseTabbedSelectableContainerComponent<T> extends BaseSelectableContainerComponent<T> {


    reusedImages: string[] = [];
    selectedTabIndex = -1;

    protected readonly _router: Router = inject(Router);
    protected readonly _route: ActivatedRoute = inject(ActivatedRoute);
    protected readonly _title: Title = inject(Title);

    updateUrl($event: MatTabChangeEvent | string) {

        if (typeof $event !== 'string') {
            this.selectedTabIndex = $event.index
        }

        const tabName = typeof $event === "string" ? $event : $event.tab.textLabel;
        const formattedTabName = tabName.toLowerCase().replaceAll(' ', '');

        this._router.navigate(['..', formattedTabName], {relativeTo: this._route}).then(() => {
            this.updateTitle(tabName);
        });
    }

    protected activateTabFromRoute(tabNames: string[]): void {
        this._route.paramMap.pipe(
            take(1),
            tap(params => {

                const tabName = params.get('tabName');

                console.log(tabName, tabNames)

                if (tabName) {
                    this.selectedTabIndex = tabNames
                        .map(s => s.toLowerCase().replaceAll(' ', ''))
                        .indexOf(tabName);
                    this.updateTitle(tabNames[this.selectedTabIndex])
                } else if (tabNames[0]) {
                    this.updateUrl(tabNames[0])
                }
            })
        ).subscribe();
    }

    protected getMultipleIconNames(iconNames: string[]): string[] {
        const filtered = iconNames.filter((v, i) => iconNames.indexOf(v) !== i);
        return [...new Set(filtered)];
    }

    protected updateTitle(tabName: string) {
        const title = this._title.getTitle();
        if (title) {
            this._title.setTitle(`${tabName} - ${title}`)
        }
    }

}
