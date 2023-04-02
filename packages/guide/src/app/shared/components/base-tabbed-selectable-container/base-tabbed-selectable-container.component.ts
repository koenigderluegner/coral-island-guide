import { Component, inject } from '@angular/core';
import { BaseSelectableContainerComponent } from "../base-selectable-container/base-selectable-container.component";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    template: '',
})
export class BaseTabbedSelectableContainerComponent<T> extends BaseSelectableContainerComponent<T> {


    reusedImages: string[] = [];
    selectedTabIndex = -1;

    protected readonly _router: Router = inject(Router);
    protected readonly _route: ActivatedRoute = inject(ActivatedRoute);

    updateUrl($event: MatTabChangeEvent) {
        let tab = $event.tab.textLabel.toLowerCase().replaceAll(' ', '');
        this._router.navigate(['..', tab], {relativeTo: this._route});
    }

    protected _getMultipleIconNames(iconNames: string[]): string[] {
        const filtered = iconNames.filter((v, i) => iconNames.indexOf(v) !== i);
        return [...new Set(filtered)];
    }

}
