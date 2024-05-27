import { Component, inject } from '@angular/core';
import {
    FestivalData,
    FestivalDisplayNames,
    FestivalIcons,
    FestivalName,
    FestivalShopItemData,
    OpeningHours
} from "@ci/data-types";
import { ActivatedRoute } from "@angular/router";
import { FestivalRouteData } from "../../types/festival-route-data.type";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Observable, switchMap } from "rxjs";
import { DatabaseService } from "../../../shared/services/database.service";
import { ListDetailService } from "../../../shared/components/list-detail-container/list-detail.service";

@Component({
    selector: 'app-generic-festival',
    templateUrl: './generic-festival.component.html',
})
export class GenericFestivalComponent {

    protected selectedEntity: FestivalShopItemData | undefined;
    protected festivalName?: FestivalName;
    protected readonly FESTIVAL_DISPLAY_NAMES = FestivalDisplayNames
    protected readonly FESTIVAL_ICONS = FestivalIcons
    protected readonly festivalData$: Observable<FestivalData>;
    protected openingHours$?: Observable<Record<string, OpeningHours>>;
    protected showTable = false;
    private readonly _router = inject(ActivatedRoute);
    private readonly _database = inject(DatabaseService);
    readonly #listDetailService = inject(ListDetailService);

    constructor() {
        this.festivalData$ = this._router.data
            .pipe(
                takeUntilDestroyed(),
                switchMap(data => {
                        const routeData = data as FestivalRouteData
                        this.festivalName = routeData.name;

                    if (!routeData.hasNoOpeningHours) {
                        this.openingHours$ = this._database.fetchFestivalOpeningHours$(routeData.name)
                    }

                        return this._database.fetchFestivalData$(routeData.name)

                    }
                )
            )
    }

    showDetails(entity: FestivalShopItemData): void {
        this.selectedEntity = entity;
        this.#listDetailService.open()
    }

}
