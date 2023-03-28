import { Component, Input } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { CookingRecipe } from "@ci/data-types";
import { coerceBooleanProperty } from "@angular/cdk/coercion";

@Component({
    selector: 'app-cooking-table',
    templateUrl: './cooking-table.component.html',
    styleUrls: ['./cooking-table.component.scss'],
})
export class CookingTableComponent extends BaseTableComponent<CookingRecipe> {

    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'outputName',
        'ingredients',
        'price',
        'unlock'
    ];

    _showUtensil = false;

    @Input()
    get showUtensil(): boolean {
        return this._showUtensil;
    }

    set showUtensil(size: boolean | number | string | null | undefined) {
        this._showUtensil = coerceBooleanProperty(size);
    }

    protected override setupDataSource(dataSource: BaseTableComponent<CookingRecipe>["dataSource"]) {
        super.setupDataSource(dataSource);

        const utensilIndex = this.displayedColumns.indexOf('utensil');
        if (this._showUtensil && utensilIndex === -1) {
            this.displayedColumns.splice(3, 0, 'utensil');
            this.displayHeaderColumns = this.displayedColumns.filter(col => col !== 'icon');
        } else if (!this._showUtensil && utensilIndex !== -1) {
            this.displayedColumns.splice(utensilIndex, 1);
            this.displayHeaderColumns = this.displayedColumns.filter(col => col !== 'icon');
        }
    }
}
