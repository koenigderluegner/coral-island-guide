import { Component } from '@angular/core';
import { MinimalItem, OfferingAltar, Offerings } from "@ci/data-types";
import { Observable, take, tap } from "rxjs";
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";

@Component({
    selector: 'app-lake-temple',
    templateUrl: './lake-temple.component.html',
})
export class LakeTempleComponent extends BaseTabbedSelectableContainerComponent<MinimalItem> {
    protected activeOffering?: Offerings;
    protected offerings$: Observable<OfferingAltar[]>;

    constructor() {
        super()
        this.offerings$ = this._database.fetchOfferings$().pipe(
            tap((records) => {
                    const altarNames = records.map(altar => altar.offeringGroupTitle);
                    this._route.paramMap.pipe(
                        tap(params => {

                            const altar = params.get('altar');

                            if (altar)
                                this.selectedTabIndex = altarNames.map(s => s.toLowerCase().replaceAll(' ', '')).indexOf(altar);
                        }),
                        take(1)
                    ).subscribe();


                }
            )
        );


    }


}
