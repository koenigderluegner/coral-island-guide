import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MinimalItem, Season } from "@ci/data-types";

@Component({
    template: ''
})
export abstract class BaseTableComponent<T> implements OnInit, OnChanges, AfterViewInit {

    matDataSource?: MatTableDataSource<T>;
    displayedColumns: string[] = [];
    displayHeaderColumns: string[] = [];
    @ViewChild(MatSort) sort?: MatSort;
    sortingDataAccessor?: (item: T, property: string) => string | number
    protected abstract readonly BASE_DISPLAY_COLUMNS: string[]

    constructor() {
        this.sortingDataAccessor = this.sortingDataAccessor?.bind(this);
        this.sortHelper = this.sortHelper.bind(this);
    }

    protected _dataSource: T[] = [];

    @Input({required: true})
    public get dataSource(): T[] {
        return this._dataSource;
    }

    public set dataSource(value: T[]) {
        this._dataSource = value;
    }

    ngAfterViewInit() {
        if (this.matDataSource && this.sort) {
            this.matDataSource.sort = this.sort;
            if (this.sortingDataAccessor)
                this.matDataSource.sortingDataAccessor = this.sortingDataAccessor as MatTableDataSource<T>['sortingDataAccessor'];
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const currentValue: T[] | undefined = changes['dataSource'].currentValue;
        if (currentValue) {
            this.setupDataSource(currentValue);
        }
    }


    ngOnInit(): void {
        this.setupDataSource(this.dataSource);
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
            if (item.includes(Season.SPRING)) return 1;
            if (item.includes(Season.SUMMER)) return 2;
            if (item.includes(Season.FALL)) return 3;
            if (item.includes(Season.WINTER)) return 4;
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
