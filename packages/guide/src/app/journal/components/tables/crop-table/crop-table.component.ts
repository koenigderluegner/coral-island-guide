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

        'price'
    ];

}
