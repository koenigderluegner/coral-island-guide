import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

@Component({
    template: ''
})
export abstract class BaseTableComponent<T> implements OnInit, OnChanges, AfterViewInit {

    @Input() dataSource: T[] = [];

    matDataSource?: MatTableDataSource<BaseTableComponent<T>['dataSource'][0]>;
    displayedColumns: string[] = [];
    displayHeaderColumns: string[] = [];

    @ViewChild(MatSort) sort?: MatSort;

    sortingDataAccessor?: (item: BaseTableComponent<T>['dataSource'][0], property: string) => string | number

    protected abstract readonly BASE_DISPLAY_COLUMNS: string[]

    constructor() {
        this.sortingDataAccessor = this.sortingDataAccessor?.bind(this);
    }


    ngAfterViewInit() {
        if (this.matDataSource && this.sort) {
            this.matDataSource.sort = this.sort;
            if (this.sortingDataAccessor)
                this.matDataSource.sortingDataAccessor = this.sortingDataAccessor as MatTableDataSource<BaseTableComponent<T>['dataSource'][0]>['sortingDataAccessor'];
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const currentValue: BaseTableComponent<T>["dataSource"] | undefined = changes['dataSource'].currentValue;
        if (currentValue) {
            this.setupDataSource(currentValue);
        }
    }


    ngOnInit(): void {
        this.setupDataSource(this.dataSource);
    }


    protected setupDataSource(dataSource: BaseTableComponent<T>['dataSource']) {
        this.matDataSource = new MatTableDataSource(dataSource);
        this.displayedColumns = [...this.BASE_DISPLAY_COLUMNS];
        this.displayedColumns = [...this.BASE_DISPLAY_COLUMNS];

        this.displayHeaderColumns = this.displayedColumns.filter(column => column !== 'icon')

    }
}
