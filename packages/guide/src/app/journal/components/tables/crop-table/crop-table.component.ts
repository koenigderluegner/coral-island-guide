import { Component } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { BaseCrop } from "@ci/data-types";

@Component({
    selector: 'app-crop-table',
    templateUrl: './crop-table.component.html',
})
export class CropTableComponent extends BaseTableComponent<BaseCrop> {

    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'displayName',
        'growTime',
        'regrow',
        'season',
        'size',
        'seed',
        'seedPrice',

        'sellPrice'
    ];

    override sortingDataAccessor = (item: CropTableComponent['dataSource'][0], property: string) => {

        const sortHelperValue = this.sortHelper(item.dropData[0].item, property)

        if (sortHelperValue !== null) return sortHelperValue;


        switch (property) {
            case 'key':
                return item[property];
            case 'seed':
                return item.item.displayName;
            case 'regrow':
                if (!item.isRegrowable) return -1;
                return item.regrowableLength;
            case 'growTime':
                return item.growTime;
            case 'seedPrice':
                return item.item.price;
            case 'season':
                return this.sortHelper(item.growableSeason) ?? 5;
            case 'size':
                return item.size.length * item.size.width;


        }

        return 0;

    };


}
