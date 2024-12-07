import { AfterViewInit, Component, computed, effect, input, viewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MinimalItem, Season } from "@ci/data-types";

@Component({
    template: '',
    standalone: false
})
export abstract class BaseTableComponent<T> implements AfterViewInit {

    matDataSource?: MatTableDataSource<T>;
    displayedColumns: string[] = [];
    displayHeaderColumns: string[] = [];
    readonly sort = viewChild(MatSort);
    sortingDataAccessor?: (item: T, property: string) => string | number
    dataSource = input.required<T[]>()
    protected _dataSource = computed<T[]>(() => this.dataSource());
    protected abstract readonly BASE_DISPLAY_COLUMNS: string[]

    constructor() {
        this.sortingDataAccessor = this.sortingDataAccessor?.bind(this);
        this.sortHelper = this.sortHelper.bind(this);

        effect(() => {
            this.setupDataSource(this._dataSource());
        });
    }

    ngAfterViewInit() {
        const sort = this.sort();
        if (this.matDataSource && sort) {
            this.matDataSource.sort = sort;
            if (this.sortingDataAccessor)
                this.matDataSource.sortingDataAccessor = this.sortingDataAccessor as MatTableDataSource<T>['sortingDataAccessor'];
        }
    }


    protected setupDataSource(dataSource: T[]) {
        this.matDataSource = new MatTableDataSource(dataSource);
        this.displayedColumns = [...this.BASE_DISPLAY_COLUMNS];

        this.displayHeaderColumns = this.displayedColumns.filter(column => column !== 'icon')
    }

    protected sortHelper<T extends MinimalItem & {
        sellPrice?: number
    }>(item: T | undefined | Season[], property?: string): string | number | null {

        if (!item) return null;

        if (Array.isArray(item)) {
            if (item.includes("Spring")) return 1;
            if (item.includes("Summer")) return 2;
            if (item.includes("Fall")) return 3;
            if (item.includes("Fall")) return 4;
            return 5;
        }


        switch (property) {

            case 'outputName':
            case 'displayName':
                return item.displayName

            case 'sellPrice':
                return item.sellPrice ?? -1

            default:
                return null;
        }
    }

}
