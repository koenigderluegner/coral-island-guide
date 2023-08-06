import { Component } from '@angular/core';
import { OpeningHours, ShopItemData } from "@ci/data-types";
import { Observable } from "rxjs";
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { UiIcon } from "../../../shared/enums/ui-icon.enum";

@Component({
    selector: 'app-blacksmith',
    templateUrl: './blacksmith.component.html',
    styleUrls: ['./blacksmith.component.scss'],
})
export class BlacksmithComponent extends BaseSelectableContainerComponent<ShopItemData> {

    protected shopItemData$: Observable<ShopItemData[]>;
    protected uiIcon = UiIcon;
    protected openingHours$: Observable<Record<string, OpeningHours>>;

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemDataBlacksmith$();
        this.openingHours$ = this._database.fetchOpeningHoursBlacksmith$();
    }

    shortenWeekdays(weekdays: string[]): string[] {
        return weekdays.map(s => s.substring(0, 3))
    }

}
