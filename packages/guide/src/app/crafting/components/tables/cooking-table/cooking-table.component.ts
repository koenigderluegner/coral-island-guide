import { booleanAttribute, Component, inject, input } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { CookingRecipe } from "@ci/data-types";
import { DatabaseService } from "../../../../shared/services/database.service";

@Component({
    selector: 'app-cooking-table',
    templateUrl: './cooking-table.component.html',
})
export class CookingTableComponent extends BaseTableComponent<CookingRecipe> {

    showUtensil = input(false, {transform: booleanAttribute})
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'outputName',
        'ingredients',
        'sellPrice',
        'unlock'
    ];
    protected cookingUtensilMapping = inject(DatabaseService).getCookingUtensilMapping();

    override sortingDataAccessor = (item: CookingRecipe, property: string) => {

        const sortHelperValue = this.sortHelper(item.item, property)

        if (sortHelperValue !== null) return sortHelperValue;

        return 0;

    };

    protected override setupDataSource(dataSource: BaseTableComponent<CookingRecipe>["dataSource"]) {
        super.setupDataSource(dataSource);

        const utensilIndex = this.displayedColumns.indexOf('utensil');
        if (this.showUtensil() && utensilIndex === -1) {
            this.displayedColumns.splice(3, 0, 'utensil');
            this.displayHeaderColumns = this.displayedColumns.filter(col => col !== 'icon');
        } else if (!this.showUtensil() && utensilIndex !== -1) {
            this.displayedColumns.splice(utensilIndex, 1);
            this.displayHeaderColumns = this.displayedColumns.filter(col => col !== 'icon');
        }
    }
}
